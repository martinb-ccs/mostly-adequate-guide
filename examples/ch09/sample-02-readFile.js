//========================================================
// require
//========================================================
const { title, IO } = require('../diagnostics');
const { compose, map, head } = require('../../support');
const fs = require('fs');

//========================================================
title("readFile - cat");
//========================================================

// readFile :: String -> IO String
const readFile = filename => new IO(() => fs.readFileSync(filename, 'utf-8'));

// print :: String -> IO String
const print = x => new IO(() => {
  console.log(x);
  return x;
});

// cat :: String -> IO (IO String)
const cat = compose(map(print), readFile);

// What we've got here is an `IO` trapped inside another `IO` 
// because `print` introduced a second `IO` during our `map`. 
// To continue working with our string, we must `map(map(f))` and 
// to observe the effect, we must `unsafePerformIO().unsafePerformIO()`.
cat('.git/config').unsafePerformIO().unsafePerformIO();
// IO(IO('[core]\nrepositoryformatversion = 0\n'))

//========================================================
title("readFile - catFirstChar");
//========================================================

// catFirstChar :: String -> IO (IO String)
// map -> IO
// map -> IO
// head -> String
const catFirstChar = compose(map(map(head)), cat);

catFirstChar('.git/config').unsafePerformIO().unsafePerformIO().log();
// IO(IO('['))