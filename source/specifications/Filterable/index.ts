/** @ignore */
export interface Filterable<A> {
	// filter :: Filterable f => f a ~> (a -> Boolean) -> f a
	filter(fn: (value: A) => Boolean): Filterable<A>;
}

export default Filterable;
