/**
 * @category Helpers
 * @description Returns previously saved value
 * @summary always :: a -> b -> a
 * @returns {function}
 * @example
 * const saved = always(42);
 * saved(33); // 42
 */
export default function always<A>(a: A): (...args: any[]) => A {
    return function (..._args: Array<any>): A {
        return a;
    }
};
