# Functional Programming with Javascript

continue with: ch09 exercise C !!!

## Resources

[Functional Programming Jargon](https://github.com/hemanth/functional-programming-jargon)
[Fantasy Land Specification](https://github.com/fantasyland/fantasy-land)

## Notes

- Functor 
    - implements a `map` function
    - laws:
        - identity    : map(id) === id
        - composition : compose(map(f), map(g)) === map(compose(f, g));
- Pointed Functor
    - is a Functor
    - implements a `of` function
        - aliases: pure, point, unit, return
    - lift any value into the type
- Monad
    - is a Pointed Functor
    - implements a `join` function
    - implements a `chain` function
        - aliases: `>>=` (bind), flatMap
        - combines `map` and `join`: (f,m) => m.map(f).join() 
    - laws:
        - identity 
        - associativity
 - Applicative Functors
    - is a Pointed Functor
    - implements a `ap` function
    - laws:
        - Identity
        - Homomorphism
        - Interchange
        - Composition
 - Traversable
    - implements a `sequence` function
    - implements a `traverse` function


A Natural Transformation is a "morphism between functors", that is, a function
which operates on the containers themselves. Typewise, it is a function:
    
    (Functor f, Functor g) => f a -> g a


``` javascript    
// Monad laws:

// associativity
compose(join, map(join)) === compose(join, join);

// identity for all (M a)
compose(join, of) === compose(join, map(of)) === id;

const mcompose = (f, g) => compose(chain(f), g);

// left identity
mcompose(M, f) === f;

// right identity
mcompose(f, M) === f;

// associativity
mcompose(mcompose(f, g), h) === mcompose(f, mcompose(g, h));
```

## Functional JavaScript Libraries

- folktale
- ramda
- fantasy-land