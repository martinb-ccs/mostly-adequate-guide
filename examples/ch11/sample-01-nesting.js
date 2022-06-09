//========================================================
// require
//========================================================
const { title, readonlySample } = require('../diagnostics');

//========================================================
title("curse this nesting");
//========================================================

readonlySample(() => {
    Right(Maybe('b'));

    IO(Task(IO(1000)));

    [Identity('bee thousand')];
});

//========================================================
title("saveComment");
//========================================================

readonlySample(() => {
    // getValue :: Selector -> Task Error (Maybe String)
    // postComment :: String -> Task Error Comment
    // validate :: String -> Either ValidationError String

    // saveComment :: () -> Task Error (Maybe (Either ValidationError (Task Error Comment)))
    const saveComment = compose(
        map(map(map(postComment))),
        map(map(validate)),
        getValue('#comment'),
    );
});
