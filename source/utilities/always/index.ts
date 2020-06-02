/**
 * Returns previously saved value
 * @return {function}
 * @example
 * const saved = always(42);
 * expect(saved()).to.equal(42);
 * expect(saved(100)).to.equal(42);
 */
// always :: a -> b -> a
export default function always<A>(a: A): Function {
    return function alwaysInternal(..._args: Array<any>): A {
        return a;
    }
};
