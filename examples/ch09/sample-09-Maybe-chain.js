
//========================================================
// require
//========================================================
const { title, readonlySample } = require('../diagnostics');
const { add, safeProp, Maybe } = require('../../support');

//========================================================
title("getJSON");
//========================================================

readonlySample(() => {
  // getJSON :: Url -> Params -> Task JSON
  getJSON('/authenticate', { username: 'stale', password: 'crackers' })
    .chain(user => getJSON('/friends', { user_id: user.id }));
  // Task([{name: 'Seimith', id: 14}, {name: 'Ric', id: 39}]);

  // querySelector :: Selector -> IO DOM
  querySelector('input.username')
    .chain(({ value: uname }) =>
      querySelector('input.email')
        .chain(({ value: email }) => IO.of(`Welcome ${uname} prepare for spam at ${email}`))
    );
  // IO('Welcome Olivia prepare for spam at olivia@tremorcontrol.net');
});

//========================================================
title("Maybe");
//========================================================

Maybe.of(3)
  .chain(three => Maybe.of(2).map(add(three))).log();
// Maybe(5);

Maybe.of(null)
  .chain(safeProp('address'))
  .chain(safeProp('street')).log();
// Maybe(null);
