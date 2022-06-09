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

// firstAddressStreet :: User -> Maybe (Maybe (Maybe Street))
const firstAddressStreet = compose(
    map(map(safeProp('street'))),
    map(safeHead),
    safeProp('addresses'),
);

const x = firstAddressStreet({
    addresses: [{ street: { name: 'Mulburry', number: 8402 }, postcode: 'WC2N' }],
}).log();
// Maybe(Maybe(Maybe({name: 'Mulburry', number: 8402})))