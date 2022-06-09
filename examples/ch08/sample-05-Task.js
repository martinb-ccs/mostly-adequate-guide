
//========================================================
// require
//========================================================
const { title } = require('../diagnostics');
const { curry, head, split, prop, Task } = require('../../support');
const fs = require('fs');

//========================================================
title("asynchronous tasks");
//========================================================

// -- Node readFile example ------------------------------------------

// readFile :: String -> Task Error String
const readFile = filename => new Task((reject, result) => {
    fs.readFile(filename, (err, data) => (err ? reject(err) : result(data.toString())));
});

readFile('examples/metamorphosis').map(split('\n')).map(head).log();
// Task('One morning, as Gregor Samsa was waking up from anxious dreams, he discovered that
// in bed he had been changed into a monstrous verminous bug.')


// -- jQuery getJSON example -----------------------------------------

// getJSON :: String -> {} -> Task Error JSON
const getJSON = curry((url, params) => new Task((reject, result) => {
    $.getJSON(url, params, result).fail(reject);
}));

getJSON('/video', { id: 10 }).map(prop('title')); // logging not working...!!!
// Task('Family Matters ep 15') 

// -- Default Minimal Context ----------------------------------------

// We can put normal, non futuristic values inside as well
Task.of(3).map(three => three + 1).log();
// Task(4)