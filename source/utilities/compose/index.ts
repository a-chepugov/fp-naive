/**
 * Compose functions
 * @return {function}
 * @example
 * const fn1 = (a) => a * 2;
 * const fn2 = (a) => a + 1;
 * const fn3 = (a) => a ** 2;
 * compose(fn1, fn2, fn3)(2); // 10;
 */
export default function compose(...fns: Array<(a?: any) => any>): Function {
    return fns
        .reduce(<A, B, C>(composition: (b?: B) => C, fn: (a?: A) => B): (a?: A) => C =>
            function (a?: A): C {
                return composition.call(this, fn.call(this, a));
            });
};
