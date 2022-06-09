//========================================================
// require
//========================================================
const { title } = require('../diagnostics');
const { append, prop } = require('../../support');

//========================================================
// Container
//========================================================

class Container {
    // constructor never used directly
    constructor(x) {
        this.$value = x;
    }

    // always construct with 'of'
    static of(x) {
        return new Container(x);
    }

    // (a -> b) -> Container a -> Container b
    map(f) {
        return Container.of(f(this.$value));
    }
}

// (a -> b) -> Container a -> Container b
// Container.prototype.map = function (f) {
//     return Container.of(f(this.$value));
// };

//========================================================
title('samples -> of');
//========================================================

Container.of(3).log();
// Container(3)

Container.of('hotdogs').log();
// Container("hotdogs")

Container.of(Container.of({ name: 'yoda' })).log();
// Container(Container({ name: 'yoda' }))

//========================================================
title('samples -> map');
//========================================================

Container.of(2).map(two => two + 2).log();
// Container(4)

Container.of('flamethrowers').map(s => s.toUpperCase()).log();
// Container('FLAMETHROWERS')

Container.of('bombs').map(append(' away')).map(prop('length')).log();
// Container(10)