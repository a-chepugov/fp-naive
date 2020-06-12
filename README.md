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
const {Maybe} = require('fp-naive');
const m = Maybe.fromNullable(3);
console.log(m.inspect());
```

- one file
```javascript
const Either = require('fp-naive/build/implementations/Either').default;
const e = Either.left(5);
console.log(e.inspect());
```

## Documentation
### Maybe
Allow to skip operations when there is no data Container (Nothing case):

Provides methods:
- just and nothing - create instances of Maybe
```js
Maybe
	.just(1)
	.inspect(); // Maybe.Just { 1 }

Maybe
	.nothing(1)
	.inspect(); // Maybe.Nothing { }
```

- fromNullable - safely creates instance
```js
Maybe
	.fromNullable(0)
	.inspect(); // Maybe.Just { 0 }

Maybe
	.fromNullable()
	.inspect(); // Maybe.Nothing { }

Maybe
	.fromNullable(null)
	.inspect(); // Maybe.Nothing { }

Maybe
	.fromNullable(undefined)
	.inspect(); // Maybe.Nothing { }
```
- map - transforms internal value
```js
Maybe
	.fromNullable(2)
	.map((a) => a + 1)
	.inspect(); // Maybe.Just { 3 }
```

- ap - passes arguments into contained function
```js
Maybe.fromNullable((a) => (b) => a + b)
	.ap(Maybe.fromNullable(2))
	.ap(Maybe.fromNullable(3))
	.inspect(); // Maybe.Just { 5 }
```

Maybe.Nothing will safely ignore this methods and Maybe.Nothing wil be returned
```js
const incOrFail = (a) => {
	if (Number.isFinite(a)) {
		return a + 1;
	} else {
		throw new Error('Not a number: ' + a);
	}
};

Maybe
	.fromNullable()
	.map(incOrFail)
	.inspect(); // Maybe.Nothing { }
```

- get - returns contained value ( throw an Error in case of Maybe Nothing)
```js
Maybe
	.fromNullable(5)
	.get(); // 5
```

- getOrElse and getOrElseRun - allow to safely return contained value or use default value or run function
```js
Maybe
	.fromNullable(5)
	.getOrElse(8); // 5

Maybe
	.fromNullable()
	.getOrElse(8); // 8

Maybe
	.fromNullable()
	.getOrElseRun(() => 8); // 8
```

[See full documentation here](https://htmlpreview.github.io/?https://github.com/a-chepugov/fp-naive/docs/docs/index.html)
