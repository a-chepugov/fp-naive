export interface Functor<A> {
    // map :: Functor f => f a ~> (a -> b) -> f b
    map<B>(fn: (a: A) => B): Functor<B>
}

export default Functor;
