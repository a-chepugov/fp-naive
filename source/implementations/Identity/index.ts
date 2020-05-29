import {Apply, Applicative, Chain, Monad, ARG1, RETURNS, isFN} from "../../interfaces/Monad";
import {Traversable} from "../../interfaces/Traversable";

export default class Identity<A> implements Monad<A>, Traversable<A> {
    private readonly value: A;

    constructor(value: A) {
        this.value = value;
    }

    map<B>(fn: (value: A) => B): Identity<B> {
        return new Identity(fn(this.value));
    }

    ap(other: Apply<ARG1<A>>): Apply<RETURNS<A>> {
        type INPUT = ARG1<A>;
        type OUTPUT = RETURNS<A>;
        if (isFN<INPUT, OUTPUT>(this.value)) {
            return other.map<OUTPUT>(this.value);
        } else {
            throw new Error('this.value is not a function: ' + this.inspect())
        }
    }

    static of<A>(value: A): Identity<A> {
        return new Identity<A>(value);
    }

    chain<B>(fn: (value: A) => Chain<B>): Chain<B> {
        return fn(this.value);
    }

    join(): A {
        return this.value;
    }

    reduce<B>(reducer: (accumulator: B, value: A) => B, initial?: B): B {
        return reducer(undefined, this.value);
    }

    traverse<B>(fn: (a: A) => Applicative<B>): Applicative<Identity<B>> {
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
