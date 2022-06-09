//========================================================
// require
//========================================================
const { title, readonlySample } = require('../diagnostics');

//========================================================
title("renderPage");
//========================================================

readonlySample(() => {
    // Http.get :: String -> Task Error HTML

    const renderPage = curry((destinations, events) => { /* render page */ });

    Task.of(renderPage).ap(Http.get('/destinations')).ap(Http.get('/events'));
    // Task("<div>some page with dest and events</div>")
});

//========================================================
title("selector");
//========================================================

readonlySample(() => {
    // $ :: String -> IO DOM
    const $ = selector => new IO(() => document.querySelector(selector));

    // getVal :: String -> IO String
    const getVal = compose(map(prop('value')), $);

    // signIn :: String -> String -> Bool -> User
    const signIn = curry((username, password, rememberMe) => { /* signing in */ });

    IO.of(signIn).ap(getVal('#email')).ap(getVal('#password')).ap(IO.of(false));
    // IO({ id: 3, email: 'gg@allin.com' })
});
