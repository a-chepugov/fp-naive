import Functor from '../Functor';

export * as Functor from '../Functor';

import Foldable from '../Foldable';

export * as Foldable from '../Foldable';

import {Applicative, ApplicativeTypeRep} from "../Applicative";

export * as Applicative from "../Applicative";

export interface Traversable<A> extends Functor<A>, Foldable<A> {
    // traverse :: Applicative f, Traversable t => t a ~> (a -> f b) -> f (t b)
    traverse<B>(TypeRep: ApplicativeTypeRep<Traversable<B>>, fn: (a: A) => Applicative<B>)
    : Applicative<Traversable<B>>
}

export default Traversable;
