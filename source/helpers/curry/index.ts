/**
 * @category Helpers
 * @description Creates curried functions
 * @summary curry :: ((a, b, ...) -> z) -> a -> b -> ... -> z
 * @param {function} fn
 * @param {number} length - curry level
 * @returns {function}
 * @example
 * const fn = (a, b, c) => a + b + c;
 * const curried = curry(fn);
 * curried(1)(2)(3); // 6;
 */
export default (fn: (this: any, ...args: any[]) => any, length = fn.length): (this: any, ...args: any[]) => any =>
    function bind(...args: any[]): (this: any, ...args: any[]) => any {
        return length > args.length ?
            bind.bind(undefined, ...args) :
            fn(...args);
    };

