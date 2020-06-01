import Traversable from "../../interfaces/Traversable";

import * as MonadModule from "../../interfaces/Monad";

type Monad<A> = MonadModule.Monad<A>;
type Applicative<A> = MonadModule.Applicative.Applicative<A>;
type ApplicativeTypeRep<A> = MonadModule.Applicative.ApplicativeTypeRep<A>;
type ARG1<A> = MonadModule.Chain.Apply.ARG1<A>;
type RETURNS<A> = MonadModule.Chain.Apply.RETURNS<A>;
const isFN = MonadModule.Chain.Apply.isFN;

export default class Identity<A> implements Monad<A>, Traversable<A> {
    private readonly value: A;

    constructor(value: A) {
        this.value = value;
    }

    map<B>(fn: (value: A) => B): Identity<B> {
        return new Identity(fn(this.value));
    }

    ap(other: Identity<ARG1<A>>): Identity<RETURNS<A>> | never {
        if (isFN<ARG1<A>, RETURNS<A>>(this.value)) {
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

    inspect() {
        return `Identity(${
            // @ts-ignore
            this.value && typeof this.value.inspect === 'function' ? this.value.inspect() : this.value
        })`
    }
}
