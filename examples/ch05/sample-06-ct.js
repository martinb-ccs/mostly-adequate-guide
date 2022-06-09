//========================================================
// require
//========================================================
const { title } = require('../diagnostics');
const { compose } = require('../../support');

//========================================================
title("composition")
//========================================================
const g = x => x.length;
const f = x => x === 4;
const isFourLetterWord = compose(f, g);

isFourLetterWord('bozo').log();

//========================================================
title("identity")
//========================================================
const number = 4;
const id = x => x;
const f1 = compose(id, f);
const f2 = compose(f, id);
const f3 = f;

// identity
// compose(id, f) === compose(f, id) === f;  

f1(number).log();
f2(number).log();
f3(number).log();
