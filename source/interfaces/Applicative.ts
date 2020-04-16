import {Apply, Functor} from './Apply';
export {Apply, Functor} from './Apply';

export interface Applicative<T> extends Apply<T> {
    // abstract static of(value: T): Applicative<T>;
}

export default Applicative;
