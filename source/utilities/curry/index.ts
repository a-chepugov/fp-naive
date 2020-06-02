interface AnyFn {
	(this: any, ...args: any[]): any
}

/**
 * Creates curried functions
 * @param {function} fn
 * @param {number} length - curry level
 * @return {function}
 * @example
 * const fn = (a, b, c) => a + b + c;
 * const curried = curry(fn);
 * curried(1, 2, 3); // 6;
 * curried(1)(2, 3); // 6;
 * curried(1, 2)(3); // 6;
 * curried(1)(2)(3); // 6;
 */
export default (fn: AnyFn, length = fn.length): AnyFn  =>
	function bind(...args: any[]): AnyFn {
		return length > args.length ?
			bind.bind(undefined, ...args) :
			fn(...args);
	};
