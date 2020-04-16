import {Apply} from "../../interfaces/Apply";

export default class ApplyImp<A> implements Apply<A> {
    private readonly value: A;

    constructor(value: A) {
        this.value = value;
    }

    map<B>(fn: (value: A) => B): ThisType<B> {
        return new ApplyImp(fn(this.value));
    }

    ap<B>(other: Apply<(value: A) => B>): ThisType<B> {
        return other.map((fn) => fn.call(this, this.value));
    }

    static of<A>(value: A): ThisType<A> {
        return new ApplyImp<A>(value);
    }

    get(): A {
        return this.value;
    }
}
