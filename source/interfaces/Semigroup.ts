export interface Semigroup<A> {
    // concat :: Semigroup a => a ~> a -> a
    concat(other: Semigroup<A>): Semigroup<A>
}

export default Semigroup;
