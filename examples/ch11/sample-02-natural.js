//========================================================
// require
//========================================================
const { title, readonlySample } = require('../diagnostics');

//========================================================
title("examples");
//========================================================

// nt :: (Functor f, Functor g) => f a -> g a
// compose(map(f), nt) === compose(nt, map(f));

readonlySample(() => {
    // idToMaybe :: Identity a -> Maybe a
    const idToMaybe = x => Maybe.of(x.$value);

    // idToIO :: Identity a -> IO a
    const idToIO = x => IO.of(x.$value);

    // eitherToTask :: Either a b -> Task a b
    const eitherToTask = either(Task.rejected, Task.of);

    // ioToTask :: IO a -> Task () a
    const ioToTask = x => new Task((reject, resolve) => resolve(x.unsafePerform()));

    // maybeToTask :: Maybe a -> Task () a
    const maybeToTask = x => (x.isNothing ? Task.rejected() : Task.of(x.$value));

    // arrayToMaybe :: [a] -> Maybe a
    const arrayToMaybe = x => Maybe.of(x[0]);
});

//========================================================
title("feature envy");
//========================================================

readonlySample(() => {
    // arrayToList :: [a] -> List a
    const arrayToList = List.of;

    const doListyThings1 = compose(sortBy(h), filter(g), arrayToList, map(f));
    const doListyThings2 = compose(sortBy(h), filter(g), map(f), arrayToList); // law applied
});

