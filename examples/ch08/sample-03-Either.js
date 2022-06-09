//========================================================
// require
//========================================================
const { title, print } = require('../diagnostics');
const { identity, curry, concat, add, prop, inspect, compose, map, toString } = require('../../support');

//========================================================
// Either
//========================================================

class Either {
    static of(x) {
        return new Right(x);
    }

    constructor(x) {
        this.$value = x;
    }
}

class Left extends Either {
    map(f) {
        return this;
    }

    inspect() {
        return `Left(${inspect(this.$value)})`;
    }
}

class Right extends Either {
    map(f) {
        return Either.of(f(this.$value));
    }

    inspect() {
        return `Right(${inspect(this.$value)})`;
    }
}

const left = x => new Left(x);

//========================================================
title('samples');
//========================================================

Either.of('rain').map(str => `b${str}`).log();
// Right('brain')

left('rain').map(str => `It's gonna ${str}, better bring your umbrella!`).log();
// Left('rain')

Either.of({ host: 'localhost', port: 80 }).map(prop('host')).log();
// Right('localhost')

left('rolls eyes...').map(prop('host')).log();
// Left('rolls eyes...')

//========================================================
title('getAge');
//========================================================
const moment = require('moment');

// getAge :: Date -> User -> Either(String, Number)
const getAge = curry((now, user) => {
    const birthDate = moment(user.birthDate, 'YYYY-MM-DD');

    return birthDate.isValid()
        ? Either.of(now.diff(birthDate, 'years'))
        : left('Birth date could not be parsed');
});

getAge(moment(), { birthDate: '2005-12-12' }).log();
// Right(16)

getAge(moment(), { birthDate: 'July 4, 2001' }).log();
// Left('Birth date could not be parsed')

//========================================================
title('zoltar');
//========================================================

// fortune :: Number -> String
const fortune = compose(concat('If you survive, you will be '), toString, add(1));

// zoltar :: User -> Either(String, _)
const zoltar = compose(print, map(console.log), map(fortune), getAge(moment()));

zoltar({ birthDate: '2005-12-12' });
// 'If you survive, you will be 10'
// Right(undefined) => undefined because console.log doesn't return anything

zoltar({ birthDate: 'balloons!' });
// Left('Birth date could not be parsed')

//========================================================
title('zoltar_either');
//========================================================

// either :: (a -> c) -> (b -> c) -> Either a b -> c
const either = curry((f, g, e) => {
    let result;

    switch (e.constructor) {
        case Left:
            result = f(e.$value);
            break;

        case Right:
            result = g(e.$value);
            break;

        // No Default
    }

    return result;
});

// zoltar :: User -> _
const zoltar_either = compose(print, console.log, either(identity, fortune), getAge(moment()));

zoltar_either({ birthDate: '2005-12-12' });
// 'If you survive, you will be 10'
// undefined

zoltar_either({ birthDate: 'balloons!' });
// 'Birth date could not be parsed'
// undefined
