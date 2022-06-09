//========================================================
// require
//========================================================
const util = require('util');
const {
  inspect,
  compose,
  curry,
  reduce,
  toUpperCase,
  Task
} = require('../support');

//========================================================
// Object prototype extension
//========================================================
Object.prototype.log = function () {
  if (typeof this.inspect === 'function') {
    console.log(this.inspect());
  } else if (this?.constructor?.name === 'Task') {
    this.fork(
      error => error.log(),
      result => console.log("Task(", result, ")")
    );
  } else {
    console.log(this.valueOf());
  }

  return this;
}

//========================================================
// diagnostic functions
//========================================================
const title = text => {
  if (text) {
    console.log(`\n${text}:`);
  }
}

const print = object => {
  if (object && typeof object.log === 'function') {
    object.log();
  } else {
    console.log(object);
  }

  return object;
}

const trace = curry((tag, x) => {
  console.log(tag, x);
  return x;
});

const readonlySample = () => {
  console.log('This example can not be executed.');
};

//========================================================
// Functors
//========================================================

class Container {
  constructor(x) {
    this.$value = x;
  }

  [util.inspect.custom]() {
    return `Container(${inspect(this.$value)})`;
  }

  // ----- Pointed Container
  static of(x) {
    return new Container(x);
  }

  // ----- Functor Container
  map(fn) {
    return Container.of(fn(this.$value));
  }

  // ----- Applicative Container
  ap(f) {
    return f.map(this.$value);
  }

  // ----- Monad Container
  chain(fn) {
    return this.map(fn).join();
  }

  join() {
    return this.$value;
  }

  // ----- Traversable Container
  sequence(of) {
    return this.traverse(of, identity);
  }

  traverse(of, fn) {
    return fn(this.$value).map(Container.of);
  }
}

class IO {
  constructor(fn) {
    this.unsafePerformIO = fn;
  }

  inspect() {
    // WARNING: 
    // unsafePerformIO is only called here for more clear logging
    // this should never be done in a real version of IO...!!!
    return `IO(${inspect(this.unsafePerformIO())})`;
  }

  // ----- Pointed IO
  static of(x) {
    return new IO(() => x);
  }

  // ----- Functor IO
  map(fn) {
    return new IO(compose(fn, this.unsafePerformIO));
  }

  // ----- Applicative IO
  ap(f) {
    return this.chain(fn => f.map(fn));
  }

  // ----- Monad IO
  chain(fn) {
    return this.map(fn).join();
  }

  join() {
    return new IO(() => this.unsafePerformIO().unsafePerformIO());
  }
}

//========================================================
// Chapter 05
//========================================================
const reverse = reduce((acc, x) => [x, ...acc], []);
const exclaim = x => `${x}!`;
const angry = compose(exclaim, toUpperCase);

//========================================================
// Chapter 09
//========================================================
const concat = curry((a, b) => b.concat(a));

const getJSON = curry((url, params) => new Task((reject, result) => {
  $.getJSON(url, params, result).fail(reject);
}));

//========================================================
// exports
//========================================================

module.exports = {
  // diagnostics    
  title,
  print,
  trace,
  readonlySample,

  // Functors
  Container,
  IO,

  // Chapter 05
  reverse,
  exclaim,
  angry,

  // Chapter 09
  concat,
  getJSON
}

