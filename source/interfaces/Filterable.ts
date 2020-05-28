// filter :: Filterable f => f a ~> (a -> Boolean) -> f a
export interface Filterable<A> {
    filter(fn: (value: A) => Boolean): Filterable<A>
}

export default Filterable;
