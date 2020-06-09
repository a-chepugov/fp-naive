import Foldable from "../../specifications/Foldable";

/**
 * @category Point-free Utilities
 */
export default function reduce<A, B>(reducer: (accumulator: B, value: A) => B, foldable: Foldable<A>, initial: B): B {
    return foldable.reduce(reducer, initial);
}
