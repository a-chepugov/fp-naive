import Bifunctor from "../../specifications/Bifunctor";

/**
 * @category Point-free Utilities
 * @summary bimap :: (a -> b), (c -> d) -> Bifunctor a c -> Bifunctor b d
 */
export default function bimap<A, B, C, D>(fnLeft: (a: A) => B, fnRight: (c: C) => D): (bifunctor: Bifunctor<A, C>) => Bifunctor<B, D> {
	return function (bifunctor: Bifunctor<A, C>): Bifunctor<B, D> {
		return bifunctor.bimap(fnLeft, fnRight);
	};
}
