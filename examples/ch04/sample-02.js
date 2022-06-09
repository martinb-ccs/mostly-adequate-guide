//========================================================
// require
//========================================================
const { title, print } = require('../diagnostics');
const { curry } = require('../../support');

//========================================================
// functions
//========================================================
const match = curry((what, s) => s.match(what));
const replace = curry((what, replacement, s) => s.replace(what, replacement));
const filter = curry((f, xs) => xs.filter(f));
const map = curry((f, xs) => xs.map(f));

//========================================================
// main
//========================================================

//========================================================
title("map");
//========================================================
const numbers = [1, 2, 3, 4];
const times2 = map(x => x * 2);  // xs => xs.map(x => x * 2)
times2(numbers).log();           // [ 2, 4, 6, 8 ]

//========================================================
title("match");
//========================================================
match(/r/g, 'hello world').log();  // [ 'r' ]

//========================================================
title("hasLetterR");
//========================================================
const hasLetterR = match(/r/g);                              // x => x.match(/r/g)
hasLetterR('hello world').log();                             // [ 'r' ]
print(hasLetterR('just j and s and t etc'));                 // null
filter(hasLetterR, ['rock and roll', 'smooth jazz']).log();  // ['rock and roll']

//========================================================
title("removeStringsWithoutRs");
//========================================================
const removeStringsWithoutRs = filter(hasLetterR);                              // xs => xs.filter(x => x.match(/r/g))
removeStringsWithoutRs(['rock and roll', 'smooth jazz', 'drum circle']).log();  // ['rock and roll', 'drum circle']

//========================================================
title("censored");
//========================================================
const noVowels = replace(/[aeiou]/ig);  // (r,x) => x.replace(/[aeiou]/ig, r)
const censored = noVowels('*');         // x => x.replace(/[aeiou]/ig, '*')
censored('Chocolate Rain').log();       // 'Ch*c*l*t* R**n'
