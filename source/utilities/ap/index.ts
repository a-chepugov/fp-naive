import Apply from "../../specifications/Apply";

/**
 * @category Point-free Utilities
 */
export default function ap<A, B>(apply: Apply<A>, applyFn: Apply<(a: A) => B>): Apply<B> {
    return applyFn.ap(apply);
}
