// For this exercise, we consider helpers with the following signatures:
//
//   validateEmail :: Email -> Either String Email
//   addToMailingList :: Email -> IO([Email])
//   emailBlast :: [Email] -> IO ()
//
// Use `validateEmail`, `addToMailingList` and `emailBlast` to create a function
// which adds a new email to the mailing list if valid, and then notify the whole
// list.

const trace = curry((msg, object) => {
    console.log(msg, inspect(object));
    return object;
});

// joinMailingList :: Email -> Either String (IO ())
const joinMailingList = compose(
    trace("output"),
    map(
        compose(
            trace("emailBlast"),
            chain(emailBlast),
            trace("addToMailingList"),
            addToMailingList,
            trace("input")
        )
    ),
    trace("validateEmail"),
    validateEmail
);
