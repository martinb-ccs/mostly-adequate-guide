//========================================================
// require
//========================================================
const { title } = require('../diagnostics');
const { add, Maybe, Task } = require('../../support');

//========================================================
title("prove: F.of(x).map(f) === F.of(f).ap(F.of(x))");
//========================================================

// law:
// F.of(x).map(f) === F.of(f).ap(F.of(x));

// prove:
Maybe.of(2).map(add(3)).log()
Maybe.of(add).ap(Maybe.of(2)).ap(Maybe.of(3)).log();
// Maybe(5)

Task.of(2).map(add(3)).log();
Task.of(add).ap(Task.of(2)).ap(Task.of(3)).log();
// Task(5)
