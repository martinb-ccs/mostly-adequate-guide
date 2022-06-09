//========================================================
// require
//========================================================
const { title, IO } = require('../diagnostics');
const { Maybe, Task } = require('../../support');

//========================================================
title("first address");
//========================================================

const mmo = Maybe.of(Maybe.of('nunchucks')).log();
// Maybe(Maybe('nunchucks'))

mmo.join().log();
// Maybe('nunchucks')

const ioio = IO.of(IO.of('pizza')).log();
// IO(IO('pizza'))

ioio.join().log();
// IO('pizza')

const ttt = Task.of(Task.of(Task.of('sewers')));
// Task(Task(Task('sewers')));

ttt.join();
// Task(Task('sewers'))