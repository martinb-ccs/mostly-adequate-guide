//========================================================
// require
//========================================================
const { title, trace } = require('../diagnostics');
const {
    compose,
    replace,
    toUpperCase,
    head,
    toLowerCase,
    intercalate,
    map,
    split    
} = require('../../support');

//========================================================
title("snakeCase")
//========================================================
const words = "send in the clowns";

// not pointfree because we mention the data: word
const snakeCase_npf = word => word.toLowerCase().replace(/\s+/ig, '_');

// pointfree
const snakeCase = compose(replace(/\s+/ig, '_'), toLowerCase);

snakeCase_npf(words).log();  // send_in_the_clowns
snakeCase(words).log();      // send_in_the_clowns

//========================================================
title("initials")
//========================================================
const name = 'hunter stockton thompson';

// not pointfree because we mention the data: name
const initials_npf = name => name.split(' ').map(compose(toUpperCase, head)).join('. ');

// pointfree
// NOTE: we use 'intercalate' from the appendix instead of 'join' introduced in Chapter 09!
const initials = compose(intercalate('. '), map(compose(toUpperCase, head)), split(' '));

initials_npf(name).log();   // 'H. S. T'
initials(name).log();       // 'H. S. T'