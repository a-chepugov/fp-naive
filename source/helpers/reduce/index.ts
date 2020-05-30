import Foldable from "../../interfaces/Foldable";

export default function reduce<A, B>(reducer: (accumulator: B, value: A) => B, foldable: Foldable<A>, initial: B): B {
    return foldable.reduce(reducer, initial);
}
