import Apply from "../../specifications/Apply";

/**
 * @category Point-free Utilities
 * @summary ap :: Apply a -> Apply (a -> b) -> Apply b
 */
export default function ap<A, B>(apply: Apply<A>): (applyFn: Apply<(a: A) => B>) => Apply<B> {
    return function (applyFn: Apply<(a: A) => B>): Apply<B> {
        return applyFn.ap(apply);
    };
}
