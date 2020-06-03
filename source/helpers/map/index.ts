import Functor from "../../interfaces/Functor";

export default function map<A, B>(fn: (a: A) => B, functor: Functor<A>): Functor<B> {
    return functor.map(fn);
}
