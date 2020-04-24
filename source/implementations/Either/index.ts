import {Monad, Chain, Functor, Apply} from "../../interfaces/Monad";
import Bifunctor from "../../interfaces/Bifunctor";

export default abstract class Either<L, R> implements Monad<R>, Bifunctor<L, R> {
    protected readonly left: L;
    protected readonly right: R;

    constructor(left?: L, right?: R) {
        this.left = left;
        this.right = right;
    }

    abstract map<R2>(fn: (right: R) => R2): Functor<R2>;

    abstract ap<R2>(apply: Apply<(right: R) => R2>): Apply<R2>

    abstract chain<R2>(fn: (right: R) => Chain<R2>): Chain<R2>

    abstract bimap<L2, R2>(fnLeft: (left: L) => L2, fnRight: (right: R) => R2): Bifunctor<L2, R2>

    static of<L, R>(left?: L, right?: R): Either<L, R> {
        return left ?
            new Left<L, R>(left, right) :
            new Right<L, R>(left, right);
    }

    abstract get(): R ;

    abstract getOrElse(other: R): R;

    static right<L, R>(right?: R): Right<L, R> {
        return new Right<L, R>(undefined, right);
    }

    static left<L, A>(left?: L): Left<L, A> {
        return new Left<L, A>(left, undefined);
    }

    join(): Either<L, R> {
        return this;
    }

    swap(): Either<R, L> {
        return Either.of<R, L>(this.right, this.left);
    }

    get isRight(): Boolean {
        return false;
    }

    get isLeft(): Boolean {
        return false;
    }
}

class Left<L, R> extends Either<L, R> {
    map<R2>(fn: (right: R) => R2): Functor<R2> {
        return new Left<L, R2>(this.left);
    }

    ap<R2>(other: Apply<(right: R) => R2>): Apply<R2> {
        return new Left<L, R2>(this.left);
    }

    chain<B>(fn: (right: R) => Chain<B>): Chain<B> {
        return new Left<L, B>(this.left);
    }

    bimap<L2, R2>(fnLeft: (left: L) => L2, fnRight: (right: R) => R2): Bifunctor<L2, R2> {
        return new Left<L2, R2>(fnLeft(this.left), undefined) as Bifunctor<L2, R2>;
    }

    get(): never {
        throw new Error("Can't extract the right of a Left");
    }

    getOrElse(other: R): R {
        return other;
    }

    get isLeft(): Boolean {
        return true;
    }
}

class Right<L, R> extends Either<L, R> {
    map<R2>(fn: (right: R) => R2): Functor<R2> {
        return new Right(undefined, fn(this.right));
    }

    ap<R2>(other: Apply<(right: R) => R2>): Apply<R2> {
        return other.map((fn: (right: R) => R2) => fn.call(this, this.right)) as Apply<R2>
    }

    chain<R2>(fn: (right: R) => Chain<R2>): Chain<R2> {
        return fn(this.right);
    }

    bimap<L2, R2>(fnLeft: (left: L) => L2, fnRight: (right: R) => R2): Bifunctor<L2, R2> {
        return new Right<L2, R2>(undefined, fnRight(this.right)) as Bifunctor<L2, R2>;
    }

    get(): R {
        return this.right;
    }

    getOrElse(other: R): R {
        return this.right;
    }

    get isRight(): Boolean {
        return true;
    }
}
