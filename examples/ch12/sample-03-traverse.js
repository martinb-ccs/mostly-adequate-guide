//========================================================
// require
//========================================================
const { title } = require('../diagnostics');
const { map, curry, traverse, List, Either, left } = require('../../support');

// traverse(of, fn) {
//     return this.$value.reduce(
//         (f, a) => fn(a).map(b => bs => bs.concat(b)).ap(f),
//         of(new List([])),
//     );
// }

//========================================================
title("traverse");
//========================================================

// fromPredicate :: (a -> Bool) -> a -> Either e a
const fromPredicate = curry((f, a) => f(a) ? Either.of(a) : left(a));

// partition :: (a -> Bool) -> [a] -> [Either e a]
const partition = f => map(fromPredicate(f));

// validate :: (a -> Bool) -> [a] -> Either e [a]
const validate = f => traverse(Either.of, fromPredicate(f));

//========================================================
// Sample
//========================================================

const isEven = n => n % 2 == 0;
const partitionEven = partition(isEven);
const validateEven = validate(isEven);

//========================================================
title("partition");
//========================================================
partitionEven([1, 2, 3, 4, 5, 6, 7, 8, 9]).log();

//========================================================
title("validate - all valid");
//========================================================
validateEven(new List([2, 4, 6, 8])).log();

//========================================================
title("validate - some not valid");
//========================================================
validateEven(new List([1, 2, 6, 8])).log();
