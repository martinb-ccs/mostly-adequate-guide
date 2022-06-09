//========================================================
// require
//========================================================
const { title, Container } = require('../diagnostics');
const { identity: id, map, compose, append, reverse, Maybe, Either, Task, left, toUpperCase } = require('../../support');

//========================================================
// laws
//========================================================

// identity
// map(id) === id;

// composition
// compose(map(f), map(g)) === map(compose(f, g));

//========================================================
title("identity law");
//========================================================

const idLaw1 = map(id);
const idLaw2 = id;

idLaw1(Container.of(2)).log(); // Container(2)
idLaw2(Container.of(2)).log(); // Container(2)

//========================================================
title("composition law");
//========================================================

const compLaw1 = compose(map(append(' world')), map(append(' cruel')));
const compLaw2 = map(compose(append(' world'), append(' cruel')));

compLaw1(Container.of('Goodbye')).log(); // Container('Goodbye cruel world')
compLaw2(Container.of('Goodbye')).log(); // Container('Goodbye cruel world')

//========================================================
title("mapping");
//========================================================

// topRoute :: String -> Maybe String
const topRoute = compose(Maybe.of, reverse);

// bottomRoute :: String -> Maybe String
const bottomRoute = compose(map(reverse), Maybe.of);

topRoute('hi').log();     // Just('ih')
bottomRoute('hi').log();  // Just('ih')

//========================================================
title("stack");
//========================================================

const nested = Task.of([Either.of('pillows'), left('no sleep for you')]);

// map Task
// map [Either]
// map Either 
// toUpperCase Right  
// toUpperCase Left  - is ignored
// all results in a new Task of [Either]
map(map(map(toUpperCase)), nested).log();
// Task([Right('PILLOWS'), Left('no sleep for you')])