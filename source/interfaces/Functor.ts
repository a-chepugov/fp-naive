export interface Functor<A> {
    map<B>(fn: (a: A) => B): Functor<B>
}

export default Functor;
