# Library for functional programming in JavaScript

Provides specifications and implementations for some functional models and also extra functions to make work with them easier.

You can find here:
- Maybe
- Either
- List
- IO
- Task
- ... others

## Usage
It's very simple to use this library :

- whole library
```javascript
const {Maybe} = require('fp');
const m = Maybe.fromNullable(3);
console.log(m.inspect()); 
```

- one file
```javascript
const Either = require('fp/build/implementations/Either').default;
const e = Either.left(5);
console.log(e.inspect()); 
```

## Documentation
[See full documentation here](https://htmlpreview.github.io/?https://github.com/a-chepugov/fp/docs/docs/index.html)
