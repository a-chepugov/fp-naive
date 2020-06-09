import Functor from "../../specifications/Functor";

/**
 * @category Point-free Utilities
 */
export default function map<A, B>(fn: (a: A) => B, functor: Functor<A>): Functor<B> {
    return functor.map(fn);
}
