import {Functor} from './Functor';

export {Functor} from './Functor';

export interface Bifunctor<A, C> extends Functor<A> {
    bimap<B, D>(fnLeft: (a: A) => B, fnRight: (c: C) => D): Bifunctor<B, D>
}

export default Bifunctor;
