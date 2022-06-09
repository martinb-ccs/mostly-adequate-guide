//========================================================
// require
//========================================================
const { title, Container } = require('../diagnostics');
const { add, map } = require('../../support');

//========================================================
title("intro");
//========================================================

// We can't do this because the numbers are bottled up.
add(Container.of(2), Container.of(3));
// NaN

// Let's use our trusty map
const containerOfAdd2 = map(add, Container.of(2));
// Container(add(2))

Container.of(2).chain(two => Container.of(3).map(add(two))).log();
// Container(5)