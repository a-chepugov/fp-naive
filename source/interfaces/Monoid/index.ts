import Semigroup from '../Semigroup';

export * as Semigroup from '../Semigroup';
/** @ignore */
export interface Monoid<A> extends Semigroup<A> {
    // empty :: Monoid m => () -> m
    // static empty(): Monoid<A>;
}

/** @ignore */
export type MonoidTypeRep<A> = { empty: () => Monoid<A> }

export default Monoid;
