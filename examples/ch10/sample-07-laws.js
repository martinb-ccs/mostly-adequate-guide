//========================================================
// require
//========================================================
const { title, concat, IO } = require('../diagnostics');
const {
    identity: id,
    liftA2,
    compose,
    toUpperCase,
    reverse,
    Task,
    Maybe,
    Identity,
    Either
} = require('../../support');

//========================================================
title("closed under composition");
//========================================================

// applicatives are "closed under composition", meaning ap will 
// never change container types on us (yet another reason to favor over monads). 
const tOfM = compose(Task.of, Maybe.of);

liftA2(liftA2(concat), tOfM('Rainy Days and Mondays'), tOfM(' always get me down')).log();
// Task(Maybe(Rainy Days and Mondays always get me down))

//========================================================
title("Identity");
//========================================================

// identity
// A.of(id).ap(v) === v;
// Since of/ap is the same as map so this law follows directly from functor identity: map(id) == id.

const i = Identity.of('Pillow Pets');
Identity.of(id).ap(i) === i;

Identity.of(id).ap(i).log(); // Identity('Pillow Pets')
i.log();                     // Identity('Pillow Pets')

//========================================================
title("Homomorphism");
//========================================================

// homomorphism
// A.of(f).ap(A.of(x)) === A.of(f(x));
// A homomorphism is just a structure preserving map. In fact, a functor 
// is just a homomorphism between categories as it preserves the original 
// category's structure under the mapping.

Either.of(toUpperCase).ap(Either.of('oreos')) === Either.of(toUpperCase('oreos'));

Either.of(toUpperCase).ap(Either.of('oreos')).log(); // Right('OREOS')
Either.of(toUpperCase('oreos')).log();               // Right('OREOS')

//========================================================
title("Interchange");
//========================================================

// The interchange law states that it doesn't matter if we choose 
// to lift our function into the left or right side of ap.

// interchange
// v.ap(A.of(x)) === A.of(f => f(x)).ap(v);

const r = Task.of(reverse);
const x = 'Sparklehorse';

r.ap(Task.of(x)) === Task.of(f => f(x)).ap(r);

r.ap(Task.of(x)).log();          // Task( esrohelkrapS )
Task.of(f => f(x)).ap(r).log();  // Task( esrohelkrapS )

//========================================================
title("Composition");
//========================================================

// And finally composition which is just a way to check that our standard 
// function composition holds when applying inside of containers.

// composition
// A.of(compose).ap(u).ap(v).ap(w) === u.ap(v.ap(w));

const u = IO.of(toUpperCase);
const v = IO.of(concat('& beyond'));
const w = IO.of('blood bath ');

IO.of(compose).ap(u).ap(v).ap(w) === u.ap(v.ap(w));

// TODO: log() doesn't work, figure out why...!!!
IO.of(compose).ap(u).ap(v).ap(w);  // IO('BLOOD BATH & BEYOND')
u.ap(v.ap(w)).log();               // IO('BLOOD BATH & BEYOND')
