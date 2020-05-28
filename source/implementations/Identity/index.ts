import {Apply, Chain, Monad} from "../../interfaces/Monad";

export default class Identity<A> implements Monad<A> {
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


    get(): A {
        return this.value;
    }
}
