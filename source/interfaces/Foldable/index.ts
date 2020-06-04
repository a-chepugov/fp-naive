/** @ignore */
export interface Foldable<A> {
    // reduce :: Foldable f => f a ~> ((b, a) -> b, b) -> b
    reduce<B>(fn: (accumulator: B, value: A) => B, initial: B): B;
}

export default Foldable;
