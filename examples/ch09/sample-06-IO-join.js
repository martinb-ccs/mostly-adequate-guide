//========================================================
// require
//========================================================
const { title, readonlySample } = require('../diagnostics');

//========================================================
title("IO join");
//========================================================

readonlySample(() => {
    // log :: a -> IO a
    const log = x => new IO(() => {
        console.log(x);
        return x;
    });

    // setStyle :: Selector -> CSSProps -> IO DOM
    const setStyle = curry((sel, props) => new IO(() => jQuery(sel).css(props)));

    // getItem :: String -> IO String
    const getItem = key => new IO(() => localStorage.getItem(key));

    // applyPreferences :: String -> IO DOM
    const applyPreferences = compose(
        join,
        map(setStyle('#main')),
        join,
        map(log),
        map(JSON.parse),
        getItem,
    );

    applyPreferences('preferences').unsafePerformIO();
    // Object {backgroundColor: "green"}
    // <div style="background-color: 'green'"/>
});
