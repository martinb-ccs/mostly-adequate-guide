//========================================================
// require
//========================================================
const { title, print, reverse, exclaim } = require('../diagnostics');
const { compose, toUpperCase, head } = require('../../support');

//========================================================
// functions
//========================================================
// previously we'd have to write two composes, but since it's associative, 
// we can give compose as many fn's as we like and let it decide how to group them.
const arg = ['jumpkick', 'roundhouse', 'uppercut'];
const lastUpper = compose(print, toUpperCase, head, reverse);
const loudLastUpper = compose(print, exclaim, toUpperCase, head, reverse);

//========================================================
title("compose");
//========================================================

lastUpper(arg);      // 'UPPERCUT'
loudLastUpper(arg);  // 'UPPERCUT!'

//========================================================
title("variations");
//========================================================
const last = compose(head, reverse);
const angry = compose(exclaim, toUpperCase);
const variant_1 = compose(print, exclaim, toUpperCase, last);
const variant_2 = compose(print, angry, last);

variant_1(arg);
variant_2(arg);
