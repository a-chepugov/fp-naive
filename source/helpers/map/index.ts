import Functor from "../../interfaces/Functor";

// map :: Functor f => (a -> b) -> f a -> f b
export default function map<A, B>(fn: (a: A) => B, functor: Functor<A>): Functor<B> {
    return functor.map<B>(fn);
}
