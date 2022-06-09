//========================================================
// require
//========================================================
const { title, trace } = require('../diagnostics');
const { head, curry, eq, map, prop, last, inspect, compose, split, Maybe } = require('../../support');

//========================================================
// setup window with jsdom
//========================================================
const jsdom = require("jsdom");
const dom = new jsdom.JSDOM("<body><div>I am some inner html</div></body>", {
    url: "http://localhost:8000/blog/posts?category=food&search=wafflehouse"
});

const window = dom.window;
const document = window.document;

//========================================================
// IO
//========================================================

class IO {
    static of(x) {
        return new IO(() => x);
    }

    constructor(fn) {
        this.unsafePerformIO = fn;
    }

    map(fn) {
        return new IO(compose(fn, this.unsafePerformIO));
    }

    inspect() {
        // WARNING: 
        // unsafePerformIO is only called here for more clear logging
        // this should never be done in a real version of IO...!!!
        return `IO(${inspect(this.unsafePerformIO())})`;
    }
}

//========================================================
title("window");
//========================================================

// ioWindow :: IO Window
const ioWindow = new IO(() => window);

ioWindow.map(win => win.innerWidth).log();
// IO(1024)

ioWindow
    .map(prop('location'))
    .map(prop('href'))
    .map(split('/')).log();
// IO(['http:', '', 'localhost:8000', 'blog', 'posts?category=food&search=wafflehouse'])

// $ :: String -> IO [DOM]
const $ = selector => new IO(() => document.querySelectorAll(selector));

$('div').map(head).map(div => div.innerHTML).log();
// IO('I am some inner html')

//========================================================
title("parameters");
//========================================================

// url :: IO String
const url = new IO(() => window.location.href);

// toPairs :: String -> [[String]]
const toPairs = compose(map(split('=')), split('&'));

// params :: String -> [[String]]
const params = compose(toPairs, last, split('?'));

// find :: (a → Boolean) → [a] → a | undefined
const find = curry((fn, xs) => xs.find(fn));

// findParam :: String -> IO Maybe [String]
const findParam = key => map(
    compose(
        Maybe.of,
        trace("found  -> "),
        find(compose(eq(key), head)),
        trace("params -> "),
        params,
        trace("value  -> ")
    ), url);

// -- Impure calling code ----------------------------------------------

// run it by calling unsafePerformIO()! 
findParam('search').unsafePerformIO().log();
// Just(['search', 'wafflehouse'])