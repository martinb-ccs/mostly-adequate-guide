//========================================================
// require
//========================================================
const { title, readonlySample } = require('../diagnostics');

//========================================================
title("derived functions");
//========================================================

readonlySample(() => {
    // of/ap is equivalent to map.

    // map derived from of/ap
    X.prototype.map = function map(f) {
        return this.constructor.of(f).ap(this);
    };

    // from chain we get functor and applicative for free:

    // map derived from chain
    X.prototype.map = function map(f) {
        return this.chain(a => this.constructor.of(f(a)));
    };

    // ap derived from chain/map
    X.prototype.ap = function ap(other) {
        return this.chain(f => other.map(f));
    };
});
