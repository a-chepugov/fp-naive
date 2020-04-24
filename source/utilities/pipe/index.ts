/**
 * Pipe functions
 * @return {function}
 * @example
 * const fn1 = (a) => a * 2;
 * const fn2 = (a) => a + 1;
 * const fn3 = (a) => a ** 2;
 * pipe(fn1, fn2, fn3)(2); // 25
 */
export default function pipe(...fns: Array<(a?: any) => any>): Function {
    return fns
        .reduce(<A, B, C>(pipe: (a?: A) => B, fn: (b?: B) => C): (a?: A) => C =>
            function (a?: A): C {
                return fn.call(this, pipe.call(this, a))
            });
};
