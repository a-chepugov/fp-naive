import {Apply} from "../../interfaces/Apply";

export default class ApplyImp<A> implements Apply<A> {
    private readonly value: A;

    constructor(value: A) {
        this.value = value;
    }

    map<B>(fn: (value: A) => B): ApplyImp<B> {
        return new ApplyImp(fn(this.value));
    }

    ap<B>(other: Apply<(value: A) => B>): Apply<B> {
        return other.map<B>((fn) => fn.call(this, this.value)) as Apply<B>;
    }

    static of<A>(value: A): ApplyImp<A> {
        return new ApplyImp<A>(value);
    }

    get(): A {
        return this.value;
    }
}
