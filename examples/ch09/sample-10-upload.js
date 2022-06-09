//========================================================
// require
//========================================================
const { title, readonlySample } = require('../diagnostics');

//========================================================
title("upload - FP way");
//========================================================

readonlySample(() => {
    // readFile :: Filename -> Either String (Task Error String)
    // httpPost :: String -> String -> Task Error JSON
    // upload :: Filename -> Either String (Task Error JSON)
    const upload = compose(map(chain(httpPost('/uploads'))), readFile);
});

//========================================================
title("upload - imperative way");
//========================================================

readonlySample(() => {
    // upload :: Filename -> (String -> a) -> Void
    const upload = (filename, callback) => {
        if (!filename) {
            throw new Error('You need a filename!');
        } else {
            readFile(filename, (errF, contents) => {
                if (errF) throw errF;
                httpPost('/uploads', contents, (errH, json) => {
                    if (errH) throw errH;
                    callback(json);
                });
            });
        }
    };
});
