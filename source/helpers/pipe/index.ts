/**
 * @category Helpers
 * @description Creates pipe of functions
 * @summary pipe :: ((a -> b), (b -> c),  ..., (y -> z)) -> a -> z
 * @param {...function} fns
 * @returns {function}
 * @example
 * let fn1 = (a) => a * 2;
 * let fn2 = (a) => a + 1;
 * let fn3 = (a) => a ** 2;
 * pipe(fn1, fn2, fn3)(2); // 25
 */
export default function pipe(...fns: Array<(a?: any) => any>): (a?: any) => any {
	return fns
		.reduce(<A, B, C>(pipe: (a?: A) => B, fn: (b?: B) => C): (a?: A) => C =>
			function (a?: A): C {
				return fn.call(this, pipe.call(this, a))
			});
};
