import {Monad, Chain, Functor, Apply} from "../../interfaces/Monad";

export default abstract class Either<E extends Error, A> implements Monad<A> {
    protected readonly error: E;
    protected readonly value: A;

    protected constructor(error?: E, value?: A) {
        this.error = error;
        this.value = value;
    }

    abstract map<B>(fn: (value: A) => B): Functor<B>;

    abstract ap<B>(apply: Apply<(value: A) => B>): Apply<B>

    abstract chain<B>(fn: (value: A) => Chain<B>): Chain<B>

    static of<E extends Error, A>(error?: E, value?: A): Either<E, A> {
        return new Right<E, A>(error, value);
    }

    abstract get(): A ;

    abstract getOrElse(other: A): A;

    static right<E extends Error, A>(value?: A): Right<E, A> {
        return new Right<E, A>(undefined, value);
    }

    static left<E extends Error, A>(error?: E): Left<E, A> {
        return new Left<E, A>(error, undefined);
    }

    join(): A {
        return this.value;
    }

    get isRight(): Boolean {
        return false;
    }

    get isLeft(): Boolean {
        return false;
    }
}

class Left<E extends Error, A> extends Either<E, A> {
    map<B>(fn: (value: A) => B): Functor<B> {
        return new Left<E, B>(this.error, undefined);
    }

    ap<B>(other: Apply<(value: A) => B>): Apply<B> {
        return new Left<E, B>(this.error, undefined);
    }

    chain<B>(fn: (value: A) => Chain<B>): Chain<B> {
        return new Left<E, B>(this.error, undefined);
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

class Right<E extends Error, A> extends Either<E, A> {
    map<B>(fn: (value: A) => B): Functor<B> {
        return Either.of(this.error, fn(this.value));
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
