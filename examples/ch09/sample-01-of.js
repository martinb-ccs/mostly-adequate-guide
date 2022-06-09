//========================================================
// require
//========================================================
const { title, concat, IO } = require('../diagnostics');
const { add, map, prop, Maybe, Either, Task } = require('../../support');

//========================================================
title("of and map");
//========================================================

IO.of('tetris').map(concat(' master')).log();
// IO('tetris master')

Maybe.of(1336).map(add(1)).log();
// Maybe(1337)

// map -> Task
// map -> Array
// prop -> Array item
Task.of([{ id: 2 }, { id: 3 }]).map(map(prop('id'))).log();
// Task([2,3])

Either.of('The past, present and future walk into a bar...').map(concat('it was tense.')).log();
// Right('The past, present and future walk into a bar...it was tense.')