import Bifunctor from "../../interfaces/Bifunctor";

// bimap :: Bifunctor f => (a -> b, c -> d) -> f a c-> f b d
export default function bimap<A, B, C, D>(fnLeft: (a: A) => B, fnRight: (c: C) => D, bifunctor: Bifunctor<A, C>): Bifunctor<B, D> {
    return bifunctor.bimap<B, D>(fnLeft, fnRight);
}
