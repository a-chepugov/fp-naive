# Library for functional programming in JavaScript

Provides implementations for some functional models and also extra functions to make work with them easier.

You can find here:
- Maybe
- Either
- IO
- Task
- List
- ...

##Usage
It's very simple to use this library :

- Whole library
```javascript
const {Maybe} = require('fp');
const m = Maybe.fromNullable(3);
console.log(m.inspect()); 
```

- One file
```javascript
const Either = require('fp/build/implementations/Either').default;
const e = Either.left(5);
console.log(e.inspect()); 
```
