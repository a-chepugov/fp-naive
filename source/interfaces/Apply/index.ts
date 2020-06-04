import * as Functor from '../Functor';

export * as Functor from '../Functor';

import {FNA1} from "../Function";
/** @ignore */
export interface Apply<A> extends Functor.default<A> {
    map<B>(fn: (a: A) => B): Apply<B>;
    // ap :: Apply f => f (a -> b) -> f a -> f b
    ap<B>(other: Apply<B>): A extends FNA1<B, infer C> ? Apply<C> : any;
}

export default Apply;
