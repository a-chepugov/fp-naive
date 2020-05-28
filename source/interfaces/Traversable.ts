import {Functor} from './Functor';

export {Functor} from './Functor';

import {Foldable} from './Foldable';

export {Foldable} from './Foldable';

import Applicative from "./Applicative";

export {Applicative} from "./Applicative";

export interface Traversable<A> extends Functor<A>, Foldable<A> {
    // traverse :: Applicative f, Traversable t => t a ~> (TypeRep f, a -> f b) -> f (t b)
    traverse<B>(applicativeTypeRep: { of: (value: B) => Applicative<B> }, fn: (a: A) => Applicative<B>): Applicative<Traversable<B>>
}

export default Traversable;
