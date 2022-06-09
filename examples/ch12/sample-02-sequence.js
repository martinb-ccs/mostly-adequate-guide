//========================================================
// require
//========================================================
const { title, readonlySample, IO } = require('../diagnostics');
const { curry, List, Maybe, Task, Map, Either } = require('../../support');

//========================================================
title("samples");
//========================================================

// The inner functor is shifted to the outside and vice versa. 
// sequence :: (Traversable t, Applicative f) => (a -> f a) -> t (f a) -> f (t a)
const sequence = curry((of, x) => x.sequence(of));

sequence(List.of, Maybe.of(['the facts'])).log(); // [Just('the facts')]

readonlySample(() => {
    sequence(Task.of, new Map({ a: Task.of(1), b: Task.of(2) })); // Task(Map({ a: 1, b: 2 }))
    sequence(IO.of, Either.of(IO.of('buckle my shoe')));          // IO(Right('buckle my shoe'))
    sequence(Either.of, [Either.of('wing')]);                     // Right(['wing'])
    sequence(Task.of, left('wing'));                              // Task(Left('wing'))
});

//========================================================
title("Either");
//========================================================

readonlySample(() => {
    class Right extends Either {
        // ...
        sequence(of) {
            return this.$value.map(Either.of);
        }
    }

    class Left extends Either {
        // ...
        sequence(of) {
            return of(this);
        }
    }
});
