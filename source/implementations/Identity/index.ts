import {Apply, Applicative, Chain, Monad} from "../../interfaces/Monad";
import {Traversable} from "../../interfaces/Traversable";

export default class Identity<A> implements Monad<A>, Traversable<A> {
    private readonly value: A;

    constructor(value: A) {
        this.value = value;
    }

    map<B>(fn: (value: A) => B): Identity<B> {
        return new Identity(fn(this.value));
    }

    ap<B>(other: Apply<(value: A) => B>): Apply<B> {
        return other.map((fn: (value: A) => B) => fn.call(this, this.value)) as Apply<B>
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

    traverse<B>(applicativeTypeRep: { of: (value: any) => Applicative<any> }, fn: (a: A) => Applicative<B>): Applicative<Identity<B>> {
        return fn(this.value)
            .ap(applicativeTypeRep.of((a: B) => a))
            .map(Identity.of) as Applicative<Identity<B>>
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
