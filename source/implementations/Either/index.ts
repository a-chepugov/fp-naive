import {Monad, Chain, Functor, Apply} from "../../interfaces/Monad";
import Bifunctor from "../../interfaces/Bifunctor";

export default abstract class Either<E extends Error, A> implements Monad<A> {
    protected readonly error: E;
    protected readonly value: A;

    constructor(error?: E, value?: A) {
        this.error = error;
        this.value = value;
    }

    abstract map<B>(fn: (value: A) => B): Functor<B>;

    abstract ap<B>(apply: Apply<(value: A) => B>): Apply<B>

    abstract chain<B>(fn: (value: A) => Chain<B>): Chain<B>

    // abstract bimap<E2 extends Error, A2>(fnLeft: (e: E) => E2, fnRight: (a: A) => A2): Bifunctor<A2, E2>

    static of<E extends Error, A>(value?: A): Either<E, A> {
        return new Right<E, A>(undefined, value);
    }

    abstract get(): A ;

    abstract getOrElse(other: A): A;

    static right<E extends Error, A>(value?: A): Right<E, A> {
        return new Right<E, A>(undefined, value);
    }

    static left<E extends Error, A>(error?: E): Left<E, A> {
        return new Left<E, A>(error, undefined);
    }

    join(): Either<E, A> {
        return this;
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
        return new Left<E, B>(this.error);
    }

    ap<B>(other: Apply<(value: A) => B>): Apply<B> {
        return new Left<E, B>(this.error);
    }

    chain<B>(fn: (value: A) => Chain<B>): Chain<B> {
        return new Left<E, B>(this.error);
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
        return new Right(undefined, fn(this.value));
    }

    ap<B>(other: Apply<(value: A) => B>): Apply<B> {
        return other.map((fn: (value: A) => B) => fn.call(this, this.value)) as Apply<B>
    }

    chain<B>(fn: (value: A) => Chain<B>): Chain<B> {
        return fn(this.value);
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
