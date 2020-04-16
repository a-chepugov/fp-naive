import {Applicative, Chain} from "../../interfaces/Monad";

export default abstract class Maybe<A> implements Applicative<A>, Chain<A> {
    protected readonly value: A;

    protected constructor(value?: A) {
        this.value = value;
    }

    abstract map<B>(fn: (value: A) => B): ThisType<B>;

    abstract ap<B>(apply: Applicative<(value: A) => B>): ThisType<B>

    abstract chain<B>(fn: (value: A) => ThisType<B>): ThisType<B>

    static of<A>(value: A): Maybe<A> {
        return Maybe.fromNullable(value);
    }

    abstract get(): A | never;

    abstract getOrElse(other: A): A;

    static just<A>(value: A): Just<A> {
        return new Just<A>(value);
    }

    static nothing<A>(value?: A): Nothing<A> {
        return new Nothing<A>(value);
    }

    static fromNullable<A>(value: A): Maybe<A> {
        return value === null || value === undefined ?
            Maybe.nothing<A>(value) :
            Maybe.just<A>(value);
    }

    isJust(): Boolean {
        return false;
    }

    isNothing(): Boolean {
        return false;
    }
}

class Just<A> extends Maybe<A> {
    map<B>(fn: (value: A) => B): ThisType<B> {
        return Maybe.fromNullable(fn(this.value));
    }

    ap<B>(other: Applicative<(value: A) => B>): ThisType<B> {
        return other.map((fn: (value: A) => B) => fn.call(this, this.value))
    }

    chain<B>(fn: (value: A) => ThisType<B>): ThisType<B> {
        return fn(this.value);
    }

    get(): A {
        return this.value;
    }

    getOrElse(other: A): A {
        return this.value;
    }

    isJust(): Boolean {
        return true;
    }
}

class Nothing<A> extends Maybe<A> {
    map<B>(fn: (value: A) => B): ThisType<B> {
        return new Nothing<B>();
    }

    ap<B>(other: Applicative<(value: A) => B>): ThisType<B> {
        return new Nothing<B>();
    }

    chain<B>(fn: (value: A) => ThisType<B>): ThisType<B> {
        return new Nothing<B>();
    }

    get(): never {
        throw new Error("Can't extract the value of a Nothing");
    }

    getOrElse(other: A): A {
        return other;
    }

    isNothing(): Boolean {
        return true;
    }
}
