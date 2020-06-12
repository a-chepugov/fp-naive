import Filterable from "../../specifications/Filterable";

/**
 * @category Point-free Utilities
 * @summary filter :: (a -> Boolean) -> Filterable a -> Filterable a
 */
export default function filter<A>(filtrator: (a: A) => Boolean): (filterable: Filterable<A>) => Filterable<A> {
	return function (filterable: Filterable<A>): Filterable<A> {
		return filterable.filter(filtrator);
	};
}
