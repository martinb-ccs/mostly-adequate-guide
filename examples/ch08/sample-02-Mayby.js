//========================================================
// require
//========================================================
const { title, print } = require('../diagnostics');
const { curry, match, add, prop, inspect, compose } = require('../../support');

//========================================================
// Maybe
//========================================================

class Maybe {
    static of(x) {
        return new Maybe(x);
    }

    get isNothing() {
        return this.$value === null || this.$value === undefined;
    }

    constructor(x) {
        this.$value = x;
    }

    map(fn) {
        return this.isNothing ? this : Maybe.of(fn(this.$value));
    }

    inspect() {
        return this.isNothing ? 'Nothing' : `Just(${inspect(this.$value)})`;
    }
}

//========================================================
title('samples');
//========================================================

Maybe.of('Malkovich Malkovich').map(match(/a/ig)).log();
// Just(True)

Maybe.of(null).map(match(/a/ig)).log();
// Nothing

Maybe.of({ name: 'Boris' }).map(prop('age')).map(add(10)).log();
// Nothing

Maybe.of({ name: 'Dinah', age: 14 }).map(prop('age')).map(add(10)).log();
// Just(24)

//========================================================
title('map function');
//========================================================

// map :: Functor f => (a -> b) -> f a -> f b
const map = curry((f, anyFunctor) => anyFunctor.map(f));

compose(
    print,
    map(match(/a/ig))
)(Maybe.of('Malkovich Malkovich'));
// Just(True)

compose(
    print,
    map(match(/a/ig))
)(Maybe.of(null));
// Nothing

compose(
    print,
    map(add(10)),
    map(prop('age')),
)(Maybe.of({ name: 'Boris' }));
// Nothing

compose(
    print,
    map(add(10)),
    map(prop('age'))
)(Maybe.of({ name: 'Dinah', age: 14 }));
// Just(24)

//========================================================
title('use case -> streetName');
//========================================================

// safeHead :: [a] -> Maybe(a)
const safeHead = xs => Maybe.of(xs[0]);

// streetName :: Object -> Maybe String
const streetName = compose(print, map(prop('street')), safeHead, prop('addresses'));

streetName({ addresses: [] });
// Nothing

streetName({ addresses: [{ street: 'Shady Ln.', number: 4201 }] });
// Just('Shady Ln.')

//========================================================
title('use case -> withdraw');
//========================================================

// withdraw :: Number -> Account -> Maybe(Account)
const withdraw = curry((amount, { balance }) =>
    Maybe.of(balance >= amount ? { balance: balance - amount } : null));

// This function is hypothetical, not implemented here... nor anywhere else.
// updateLedger :: Account -> Account 
const updateLedger = account => account;

// remainingBalance :: Account -> String
const remainingBalance = ({ balance }) => `Your balance is $${balance}`;

// finishTransaction :: Account -> String
const finishTransaction = compose(remainingBalance, updateLedger);

// getTwenty :: Account -> Maybe(String)
const getTwenty = compose(print, map(finishTransaction), withdraw(20));

getTwenty({ balance: 200.00 });
// Just('Your balance is $180')

getTwenty({ balance: 10.00 });
// Nothing

//========================================================
title('Releasing the Value');
//========================================================

// maybe :: b -> (a -> b) -> Maybe a -> b
const maybe = curry((v, f, m) => {
    if (m.isNothing) {
        return v;
    }

    return f(m.$value);
});

// getTwenty :: Account -> String
const getTwenty_maybe = compose(print, maybe('You\'re broke!', finishTransaction), withdraw(20));

getTwenty_maybe({ balance: 200.00 });
// 'Your balance is $180.00'

getTwenty_maybe({ balance: 10.00 });
// 'You\'re broke!'
