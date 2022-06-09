//========================================================
// require
//========================================================
const { title, readonlySample } = require('../diagnostics');

//========================================================
title("readFile tldr");
//========================================================

readonlySample(() => {
    // readFile :: FileName -> Task Error String

    // firstWords :: String -> String
    const firstWords = compose(intercalate(' '), take(3), split(' '));

    // tldr :: FileName -> Task Error String
    const tldr = compose(map(firstWords), readFile);

    map(tldr, ['file1', 'file2']);
    // [Task('hail the monarchy'), Task('smash the patriarchy')]

    // returns    : [Task Error String]
    // simplify to: Task Error [String]
});

//========================================================
title("readFile tldr");
//========================================================

readonlySample(() => {
    // getAttribute :: String -> Node -> Maybe String
    // $ :: Selector -> IO Node

    // getControlNode :: Selector -> IO (Maybe (IO Node))
    const getControlNode = compose(map(map($)), map(getAttribute('aria-controls')), $);

    // simplify to: IO (Maybe Node)
});
