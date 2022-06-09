//========================================================
// require
//========================================================
const { title } = require('../diagnostics');
const { curry, compose, map, Maybe } = require('../../support');

//========================================================
title("first address");
//========================================================

// safeProp :: Key -> {Key: a} -> Maybe a
const safeProp = curry((x, obj) => Maybe.of(obj[x]));

// safeHead :: [a] -> Maybe a
const safeHead = safeProp(0);

// join :: Monad m => m (m a) -> m a
const join = mma => mma.join();

// firstAddressStreet :: User -> Maybe Street
const firstAddressStreet = compose(
    join,
    map(safeProp('street')),
    join,
    map(safeHead), 
    safeProp('addresses')
);

firstAddressStreet({
    addresses: [{ street: { name: 'Mulburry', number: 8402 }, postcode: 'WC2N' }],
}).log();
// Maybe({name: 'Mulburry', number: 8402})