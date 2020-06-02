import * as Functor from '../Functor';

export * as Functor from '../Functor';

import * as FunctionModule from "../Function";
type ARG1<F> = FunctionModule.ARG1<F>;

type RETURNS<F> = FunctionModule.RETURNS<F>;

export interface Apply<A> extends Functor.default<A> {
    map<B>(fn: (a: A) => B): Apply<B>
    // ap :: Apply f => f (a -> b) -> f a -> f b
    ap(other: Apply<ARG1<A>>): Apply<RETURNS<A>> | never
}

export default Apply;
