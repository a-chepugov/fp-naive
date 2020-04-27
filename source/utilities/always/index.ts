/**
 * @return {function}
 * @example
 * const saved = always(42);
 * expect(saved()).to.equal(42);
 * expect(saved(100)).to.equal(42);
 */
// always :: a -> b -> a
export default function always(a: any): Function {
    return function alwaysInternal(...args: Array<any>) {
        return a;
    }
};
