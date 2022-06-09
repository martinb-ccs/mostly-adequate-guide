//========================================================
// require
//========================================================
const { title, readonlySample } = require('../diagnostics');

//========================================================
title("Nesting solution");
//========================================================

readonlySample(() => {
    // getValue :: Selector -> Task Error (Maybe String)
    // postComment :: String -> Task Error Comment
    // validate :: String -> Either ValidationError String

    // saveComment :: () -> Task Error Comment
    const saveComment = compose(
        chain(postComment),
        chain(eitherToTask),
        map(validate),
        chain(maybeToTask),
        getValue('#comment'),
    );
});
