import * as Functor from './Functor';

export * as Functor from './Functor';

import * as Foldable from './Foldable';

export * as Foldable from './Foldable';

import * as Applicative from "./Applicative";

export * as Applicative from "./Applicative";

export interface Traversable<A> extends Functor.default<A>, Foldable.default<A> {
    map<B>(fn: (a: A) => B): Traversable<B>
    // traverse :: Applicative f, Traversable t => t a ~> (a -> f b) -> f (t b)
    traverse<B>(fn: (a: A) => Applicative.default<B>): Applicative.default<Traversable<B>>
}

export default Traversable;
