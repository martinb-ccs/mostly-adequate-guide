//========================================================
// require
//========================================================
const { title, readonlySample } = require('../diagnostics');
const { add, curry, Maybe } = require('../../support');

//========================================================
title("liftA...");
//========================================================

// Since map is equal to of/ap, we can write generic functions 
// that will ap as many times as we specify.
// lift these pieces into the applicative functor world
const liftA2 = curry((g, f1, f2) => f1.map(g).ap(f2));
const liftA3 = curry((g, f1, f2, f3) => f1.map(g).ap(f2).ap(f3));

//========================================================
title("sample - createUser");
//========================================================

readonlySample(() => {
    // checkEmail :: User -> Either String Email
    // checkName :: User -> Either String String

    const user = {
        name: 'John Doe',
        email: 'blurp_blurp',
    };

    //  createUser :: Email -> String -> IO User
    const createUser = curry((email, name) => { /* creating... */ });

    Either.of(createUser).ap(checkEmail(user)).ap(checkName(user));
    // Left('invalid email')

    // no mention of Either
    liftA2(createUser, checkEmail(user), checkName(user));
    // Left('invalid email')
});

//========================================================
title("sample - Maybe add");
//========================================================

liftA2(add, Maybe.of(2), Maybe.of(3)).log();
// Maybe(5)

//========================================================
title("sample - signIn");
//========================================================

readonlySample(() => {
    liftA2(renderPage, Http.get('/destinations'), Http.get('/events'));
    // Task('<div>some page with dest and events</div>')

    liftA3(signIn, getVal('#email'), getVal('#password'), IO.of(false));
    // IO({ id: 3, email: 'gg@allin.com' })
});
