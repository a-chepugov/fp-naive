import Functor from "../../interfaces/Functor";

export default class Identity<A> implements Functor<A> {
    private readonly value: A;

    constructor(value: A) {
        this.value = value;
    }

    map<B>(fn: (value: A) => B): ThisType<B> {
        return new Identity(fn(this.value));
    }

    static of<A>(value: A): ThisType<A> {
        return new Identity<A>(value);
    }

    get(): A {
        return this.value;
    }
}
