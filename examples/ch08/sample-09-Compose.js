//========================================================
// require
//========================================================
const { title } = require('../diagnostics');
const { map, append, Maybe, Task } = require('../../support');

//========================================================
// Compose
//========================================================

class Compose {
    constructor(fgx) {
        this.getCompose = fgx;
    }

    static of(fgx) {
        return new Compose(fgx);
    }

    map(fn) {
        return new Compose(map(map(fn), this.getCompose));
    }
}

//========================================================
title("compose Task");
//========================================================

const tmd = Task.of(Maybe.of('Rock over London'));

const ctmd = Compose.of(tmd);

const ctmd2 = map(append(', rock on, Chicago'), ctmd);
// Compose(Task(Just('Rock over London, rock on, Chicago')))

ctmd2.getCompose.fork(
    error => error.log(),
    result => console.log("Task(", result, ")")

);
// Task(Just('Rock over London, rock on, Chicago'))