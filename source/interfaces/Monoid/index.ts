import Semigroup from '../Semigroup';

export * as Semigroup from '../Semigroup';
/** @ignore */
export interface Monoid<A> extends Semigroup<A> {
    // empty :: Monoid m => () -> m
    // empty(): Monoid<A>;
}

export default Monoid;
