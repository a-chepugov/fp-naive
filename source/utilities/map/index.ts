import curry from "../curry";
import Functor from "../../interfaces/Functor";

export function map<A, B>(fn: (a: A) => B, functor: Functor<A>): Functor<B> {
    return functor.map<B>(fn);
}

export default curry(map);
