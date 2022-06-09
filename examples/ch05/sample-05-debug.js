//========================================================
// require
//========================================================
const { title, print, trace, angry } = require('../diagnostics');
const {
    compose,
    map,
    reverse,
    intercalate,
    split,
    replace,
    toLowerCase
} = require('../../support');

//========================================================
title("latin")
//========================================================

// wrong - we end up giving angry an array and we partially applied map with who knows what.
const latin_wrong = compose(map, angry, reverse);

// latin_wrong(['frog', 'eyes']); // error

// right - each function expects 1 argument.
const latin = compose(map(angry), reverse);

latin(['frog', 'eyes']).log(); // ['EYES!', 'FROG!'])

//========================================================
title("dasherize")
//========================================================

const dasherize = compose(
    print,
    intercalate('-'),
    trace('after split'),
    map(toLowerCase),
    split(' '),
    replace(/\s{2,}/ig, ' '),
);

dasherize('The world is a vampire'); // 'the-world-is-a-vampire'