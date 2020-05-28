import {Apply, Functor} from './Apply';
export {Apply, Functor} from './Apply';

export interface Applicative<T> extends Apply<T> {
    // of :: Applicative f => a -> f a
    // abstract static of(value: T): Applicative<T>;
}

export default Applicative;
