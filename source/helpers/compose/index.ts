/**
 * @category Helpers
 * @description Composes functions
 * @summary compose :: ((y -> z), (x -> y),  ..., (a -> b)) -> a -> z
 * @param {...function} fns
 * @returns {function}
 * @example
 * const fn1 = (a) => a * 2;
 * const fn2 = (a) => a + 1;
 * const fn3 = (a) => a ** 2;
 * compose(fn1, fn2, fn3)(2); // 10;
 */
export default function compose(...fns: Array<(a?: any) => any>): (a?: any) => any {
	return fns
		.reduce(<A, B, C>(composition: (b?: B) => C, fn: (a?: A) => B): (a?: A) => C =>
			function (a?: A): C {
				return composition.call(this, fn.call(this, a));
			});
};
