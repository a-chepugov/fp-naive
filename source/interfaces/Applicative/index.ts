import * as Apply from '../Apply';

export * as Apply from '../Apply';

export interface Applicative<A> extends Apply.default<A> {
    map<B>(fn: (a: A) => B): Applicative<B>
    // of :: Applicative f => a -> f a
    // abstract static of(value: T): Applicative<T>;
}

export default Applicative;

export type ApplicativeTypeRep<A> = { of: (a: A) => Applicative<A> }
