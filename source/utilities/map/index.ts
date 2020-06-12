import Functor from "../../specifications/Functor";

/**
 * @category Point-free Utilities
 * @summary map :: (a -> b) -> Functor a -> Functor b
 */
export default function map<A, B>(fn: (a: A) => B): (functor: Functor<A>) => Functor<B> {
	return function (functor: Functor<A>): Functor<B> {
		return functor.map(fn);
	};
}
