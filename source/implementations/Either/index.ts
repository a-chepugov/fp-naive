import {Applicative, Chain, Functor, Apply} from "../../interfaces/Monad";

export default abstract class Either<A, E extends Error> implements Applicative<A>, Chain<A> {
    protected readonly value: A;
    protected readonly error: E;

    protected constructor(value?: A, error?: E) {
        this.value = value;
        this.error = error;
    }

    abstract map<B>(fn: (value: A) => B): Functor<B>;

    abstract ap<B>(apply: Apply<(value: A) => B>): Apply<B>

    abstract chain<B>(fn: (value: A) => Chain<B>): Chain<B>

    static of<A, E extends Error>(value: A): Either<A, E> {
        return new Right<A, E>(value);
    }

    abstract get(): A ;

    abstract getOrElse(other: A): A;

    static right<A, E extends Error>(value: A): Right<A, E> {
        return new Right<A, E>(value);
    }

    static left<A, E extends Error>(value?: A): Left<A, E> {
        return new Left<A, E>(value);
    }

    get isRight(): Boolean {
        return false;
    }

    get isLeft(): Boolean {
        return false;
    }
}

class Right<A, E extends Error> extends Either<A, E> {
    map<B>(fn: (value: A) => B): Functor<B> {
        return Either.of(fn(this.value));
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

    get isRight(): Boolean {
        return true;
    }
}

class Left<A, E extends Error> extends Either<A, E> {
    map<B>(fn: (value: A) => B): Functor<B> {
        return new Left<B, E>();
    }

    ap<B>(other: Apply<(value: A) => B>): Apply<B> {
        return new Left<B, E>();
    }

    chain<B>(fn: (value: A) => Chain<B>): Chain<B> {
        return new Left<B, E>();
    }

    get(): never {
        throw new Error("Can't extract the value of a Left");
    }

    getOrElse(other: A): A {
        return other;
    }

    get isLeft(): Boolean {
        return true;
    }
}
