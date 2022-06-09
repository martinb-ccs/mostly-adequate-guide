//========================================================
// require
//========================================================
const { title } = require('../diagnostics');

//========================================================
// functions
//========================================================
const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];
const toUpperCase = x => x.toUpperCase();
const exclaim = x => `${x}!`;
const shout = compose(exclaim, toUpperCase);
const shout_no_compose = x => exclaim(toUpperCase(x));

//========================================================
title("compose");
//========================================================
shout('send in the clowns').log();                // "SEND IN THE CLOWNS!"
shout_no_compose('bozo is on the way...').log();