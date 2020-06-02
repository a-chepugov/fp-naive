import Traversable from "../../interfaces/Traversable";

import * as MonadModule from "../../interfaces/Monad";
type Monad<A> = MonadModule.Monad<A>;
type Applicative<A> = MonadModule.Applicative.Applicative<A>;
type ApplicativeTypeRep<A> = MonadModule.Applicative.ApplicativeTypeRep<A>;

import * as FunctionModule from "../../interfaces/Function";
type ARG1<F> = FunctionModule.ARG1<F>;
type RETURNS<F> = FunctionModule.RETURNS<F>;
const isFNA1 = FunctionModule.isFNA1;

export default class Identity<A> implements Monad<A>, Traversable<A> {
    private readonly value: A;

    constructor(value: A) {
        this.value = value;
    }

    map<B>(fn: (value: A) => B): Identity<B> {
        return new Identity(fn(this.value));
    }

    ap(other: Identity<ARG1<A>>): Identity<RETURNS<A>> | never {
        if (isFNA1<ARG1<A>, RETURNS<A>>(this.value)) {
            return other.map(this.value);
        } else {
            throw new Error('This is not a apply function: ' + this.inspect())
        }
    }

    static of<A>(value: A): Identity<A> {
        return new Identity<A>(value);
    }

    chain<B>(fn: (value: A) => Identity<B>): Identity<B> {
        return fn(this.value);
    }

    reduce<B>(reducer: (accumulator: B, value: A) => B, initial: B): B {
        return reducer(initial, this.value);
    }

    traverse<B>(TypeRep: ApplicativeTypeRep<Identity<B>>, fn: (a: A) => Applicative<B>): Applicative<Identity<B>> {
        return fn(this.value).map(Identity.of);
    }

    get(): A {
        return this.value;
    }

    join(): Identity<A | any> {
        return this.value instanceof Identity ?
            this.value :
            this;
    };

    inspect() {
        return `Identity(${
            // @ts-ignore
            this.value && typeof this.value.inspect === 'function' ? this.value.inspect() : this.value
        })`
    }
}
