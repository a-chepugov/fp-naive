export interface Functor<A> {
    // map :: Functor f => (a -> b) -> f a -> f b
    map<B>(fn: (a: A) => B): Functor<B>
}

export default Functor;
