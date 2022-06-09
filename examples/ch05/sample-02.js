//========================================================
// require
//========================================================
const { title, print } = require('../diagnostics');
const { compose, reduce } = require('../../support');

//========================================================
// functions
//========================================================
const head = x => x[0];
const reverse = reduce((acc, x) => [x, ...acc], []);
const last = compose(print, head, print, reverse);

//========================================================
title("last");
//========================================================
const words = ['jumpkick', 'roundhouse', 'uppercut'];

last(words); // 'uppercut'

//========================================================
title("associativity: compose(f, compose(g, h)) === compose(compose(f, g), h)");
//========================================================
const toUpperCase = x => x.toUpperCase();
const shoutLast1 = compose(toUpperCase, compose(head, reverse));
const shoutLast2 = compose(compose(toUpperCase, head), reverse);

shoutLast1(words).log();
shoutLast2(words).log();
