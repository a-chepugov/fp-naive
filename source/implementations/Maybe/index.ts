import {Applicative, Chain, Functor, Apply} from "../../interfaces/Monad";

export default abstract class Maybe<A> implements Applicative<A>, Chain<A> {
    protected readonly value: A;

    protected constructor(value?: A) {
        this.value = value;
    }

    abstract map<B>(fn: (value: A) => B): Functor<B>;

    abstract ap<B>(apply: Apply<(value: A) => B>): Apply<B>

    abstract chain<B>(fn: (value: A) => Chain<B>): Chain<B>

    static of<A>(value: A): Maybe<A> {
        return new Just<A>(value);
    }

    abstract get(): A | never;

    abstract getOrElse(other: A): A;

    abstract getOrElseRun(fn: () => A): A;

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

    join(): A {
        return this.value;
    }

    get isJust(): Boolean {
        return false;
    }

    get isNothing(): Boolean {
        return false;
    }
}

class Just<A> extends Maybe<A> {
    map<B>(fn: (value: A) => B): Functor<B> {
        return Maybe.fromNullable(fn(this.value));
    }

    ap<B>(other: Apply<(value: A) => B>): Apply<B> {
        return other.map((fn: (value: A) => B) => fn.call(this, this.value)) as Apply<B>
    }

    chain<B>(fn: (value: A) => Chain<B>): Chain<B> {
        return fn(this.value) as Chain<B>;
    }

    get(): A {
        return this.value;
    }

    getOrElse(other: A): A {
        return this.value;
    }

    getOrElseRun(fn: () => A): A {
        return this.value;
    };

    get isJust(): Boolean {
        return true;
    }
}

class Nothing<A> extends Maybe<A> {
    map<B>(fn: (value: A) => B): Functor<B> {
        return new Nothing<B>();
    }

    ap<B>(other: Apply<(value: A) => B>): Apply<B> {
        return new Nothing<B>();
    }

    chain<B>(fn: (value: A) => Chain<B>): Chain<B> {
        return new Nothing<B>();
    }

    get(): never {
        throw new Error("Can't extract the value of a Nothing");
    }

    getOrElse(other: A): A {
        return other;
    }

    getOrElseRun(fn: () => A): A {
        return fn();
    };

    get isNothing(): Boolean {
        return true;
    }
}
