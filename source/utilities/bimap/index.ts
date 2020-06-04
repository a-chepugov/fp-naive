import Bifunctor from "../../interfaces/Bifunctor";

/**
 * @category Point-free Utilities
 */
export default function bimap<A, B, C, D>(fnLeft: (a: A) => B, fnRight: (c: C) => D, bifunctor: Bifunctor<A, C>): Bifunctor<B, D> {
    return bifunctor.bimap(fnLeft, fnRight);
}
