import {Apply} from './Apply';

export {Apply, ARG1, RETURNS, isFN, Functor} from './Apply';

export interface Applicative<A> extends Apply<A> {
    map<B>(fn: (a: A) => B): Applicative<B>
    // of :: Applicative f => a -> f a
    // abstract static of(value: T): Applicative<T>;
}

export default Applicative;
