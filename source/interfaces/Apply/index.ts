import * as Functor from '../Functor';

export * as Functor from '../Functor';

export type ARGS<F> = F extends (...args: any[]) => any ? Parameters<F> : Parameters<any>;
export type ARG1<F> = ARGS<F>[0]
export type RETURNS<F> = F extends (...args: any[]) => any ? ReturnType<F> : never
export type FN<I, O> = (i: I) => O;

export function isFN<A, B>(object: any): object is FN<A, B> {
    return typeof (object as FN<A, B>) === 'function';
}

export interface Apply<A> extends Functor.default<A> {
    map<B>(fn: (a: A) => B): Apply<B>
    // ap :: Apply f => f (a -> b) -> f a -> f b
    ap(other: Apply<ARG1<A>>): Apply<RETURNS<A>> | never
}

export default Apply;
