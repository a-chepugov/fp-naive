export interface Functor<A> {
    map<B>(fn: (value: A) => B): ThisType<B>
}

export default Functor;
