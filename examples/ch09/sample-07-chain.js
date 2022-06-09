//========================================================
// require
//========================================================
const { title, readonlySample } = require('../diagnostics');

//========================================================
title("chain");
//========================================================

readonlySample(() => {
    // chain :: Monad m => (a -> m b) -> m a -> m b
    const chain = curry((f, m) => m.map(f).join());

    // or

    // chain :: Monad m => (a -> m b) -> m a -> m b
    const chain = f => compose(join, map(f));

    // map/join
    const firstAddressStreet = compose(
        join,
        map(safeProp('street')),
        join,
        map(safeHead),
        safeProp('addresses'),
    );

    // chain
    const firstAddressStreet = compose(
        chain(safeProp('street')),
        chain(safeHead),
        safeProp('addresses'),
    );

    // map/join
    const applyPreferences = compose(
        join,
        map(setStyle('#main')),
        join,
        map(log),
        map(JSON.parse),
        getItem,
    );

    // chain
    const applyPreferences = compose(
        chain(setStyle('#main')),
        chain(log),
        map(JSON.parse),
        getItem,
    );
});
