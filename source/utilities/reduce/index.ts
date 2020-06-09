import Foldable from "../../specifications/Foldable";

/**
 * @category Point-free Utilities
 * @summary reduce :: ((b, a) -> b), b -> Foldable a -> b
 */
export default function reduce<A, B>(reducer: (accumulator: B, value: A) => B, initial: B): (foldable: Foldable<A>) => B {
    return function (foldable: Foldable<A>): B {
        return foldable.reduce(reducer, initial);
    };
}
