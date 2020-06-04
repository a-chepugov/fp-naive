/**
 * @category Helpers
 * @description The purpose of this function is to "tap into" a chain sequence in order to view intermediate results
 * @summary tap :: (a -> *) -> a -> a
 * @param {function} interceptor
 * @example
 * const tapFn = tap(console.log);
 * Maybe.of(5).map(tapFn).map((a) => a + 1); // Maybe(6)
 */
export default function tap<A>(interceptor: (a: A) => any): (a: A) => A {
    return function identity(a: A): A {
        interceptor.call(this, a);
        return a;
    }
}
