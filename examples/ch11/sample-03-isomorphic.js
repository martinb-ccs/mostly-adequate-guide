//========================================================
// require
//========================================================
const { title, readonlySample } = require('../diagnostics');
const { map, compose, replace, Maybe } = require('../../support');

//========================================================
title("Isomorphic - Promise and Task");
//========================================================

readonlySample(() => {
    // promiseToTask :: Promise a b -> Task a b
    const promiseToTask = x => new Task((reject, resolve) => x.then(resolve).catch(reject));

    // taskToPromise :: Task a b -> Promise a b
    const taskToPromise = x => new Promise((resolve, reject) => x.fork(reject, resolve));

    const x = Promise.resolve('ring');
    taskToPromise(promiseToTask(x)) === x;

    const y = Task.of('rabbit');
    promiseToTask(taskToPromise(y)) === y;
});

//========================================================
title("Not Isomorphic - Array Maybe");
//========================================================

// maybeToArray :: Maybe a -> [a]
const maybeToArray = x => (x.isNothing ? [] : [x.$value]);

// arrayToMaybe :: [a] -> Maybe a
const arrayToMaybe = x => Maybe.of(x[0]);

const x = ['elvis costello', 'the attractions'];

// not isomorphic
maybeToArray(arrayToMaybe(x)); // ['elvis costello']

// but is a natural transformation
compose(arrayToMaybe, map(replace('elvis', 'lou')))(x).log(); // Just('lou costello')
// ==
compose(map(replace('elvis', 'lou')), arrayToMaybe)(x).log(); // Just('lou costello')

