// reduce :: Foldable f => f a ~> ((b, a) -> b, b) -> b
export interface Foldable<A> {
    reduce<B>(fn: (accumulator: B, value: A) => B, initial?: B): B
}

export default Foldable;
