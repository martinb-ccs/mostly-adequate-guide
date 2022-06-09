//========================================================
// require
//========================================================
const { title, Container } = require('../diagnostics');
const { add } = require('../../support');

// We can define `ap` like so:
Container.prototype.ap = function (otherContainer) {
    return otherContainer.map(this.$value);
};
// Remember, `this.$value` will be a function and we'll be 
// accepting another functor so we need only `map` it.

//========================================================
title("samples");
//========================================================

Container.of(add(2)).ap(Container.of(3)).log();
// Container(5)

Container.of(2).map(add).ap(Container.of(3)).log();
// Container(5)