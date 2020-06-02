import Traversable from "../../interfaces/Traversable";

import Bifunctor from "../../interfaces/Bifunctor";

import * as MonadModule from "../../interfaces/Monad";
type Monad<A> = MonadModule.Monad<A>;
type Applicative<A> = MonadModule.Applicative.Applicative<A>;
type ApplicativeTypeRep<A> = MonadModule.Applicative.ApplicativeTypeRep<A>;

import * as FunctionModule from "../../interfaces/Function";
type ARG1<F> = FunctionModule.ARG1<F>;
type RETURNS<F> = FunctionModule.RETURNS<F>;
const isFNA1 = FunctionModule.isFNA1;

export default abstract class Either<L, R> implements Monad<R>, Bifunctor<L, R>, Traversable<R> {
    protected readonly left: L;
    protected readonly right: R;

    constructor(left: L, right: R) {
        this.left = left;
        this.right = right;
    }

    abstract map<R2>(fn: (right: R) => R2): Either<L, R2>;

    abstract ap(other: Either<L, ARG1<R>>): Either<L, RETURNS<R>> | never

    abstract chain<R2>(fn: (right: R) => Either<L, R2>): Either<L, R2>

    static of<L, R>(right: R): Either<L, R> {
        return new Right<L, R>(undefined, right);
    }

    abstract bimap<L2, R2>(fnLeft: (left: L) => L2, fnRight: (right: R) => R2): Either<L2, R2>

    abstract mapLeft<L2>(fn: (left: L) => L2): Either<L2, R>;

    abstract reduce<R2>(reducer: (accumulator: R2, value: R) => R2, initial: R2): R2;

    abstract traverse<R2>(TypeRep: ApplicativeTypeRep<Either<L, R2>>, fn: (a: R) => Applicative<R2>): Applicative<Either<L, R2>>

    abstract get(): L | R ;

    abstract getOrElse(other: R): R;

    static right<L, R>(right: R): Right<L, R> {
        return new Right<L, R>(undefined, right);
    }

    static left<L, R>(left: L): Left<L, R> {
        return new Left<L, R>(left, undefined);
    }

    abstract swap(): Either<R, L>;

    get isRight(): Boolean {
        return false;
    }

    get isLeft(): Boolean {
        return false;
    }

    abstract inspect(): string;

}

class Left<L, R> extends Either<L, R> {
    map<R2>(fn: (right: R) => R2): Either<L, R2> {
        return new Left<L, R2>(this.left, undefined);
    }

    ap(other: Either<L, ARG1<R>>): Either<L, RETURNS<R>> {
        return new Left<L, RETURNS<R>>(undefined, undefined);
    }

    chain<R2>(fn: (right: R) => Either<L, R2>): Either<L, R2> {
        return new Left<L, R2>(this.left, undefined);
    }

    bimap<L2, R2>(fnLeft: (left: L) => L2, fnRight: (right: R) => R2): Left<L2, R2> {
        return new Left<L2, R2>(fnLeft(this.left), undefined);
    }

    reduce<R2>(reducer: (accumulator: R2, value: R) => R2, initial: R2): R2 {
        return undefined;
    }

    traverse<R2>(TypeRep: ApplicativeTypeRep<Either<L, R2>>, fn: (a: R) => Applicative<R2>): Applicative<Either<L, R2>> {
        return TypeRep.of(new Left<L, R2>(undefined, undefined));
    }

    mapLeft<L2>(fn: (left: L) => L2): Either<L2, R> {
        return new Left(fn(this.left), this.right);
    }

    join(): Either<L, R> {
        return this;
    };

    get(): L {
        return this.left;
    }

    getOrElse(other: R): R {
        return other;
    }

    swap(): Either<R, L> {
        return new Right<R, L>(this.right, this.left);
    }

    get isLeft(): Boolean {
        return true;
    }

    inspect() {
        return `Either.Left(${
            // @ts-ignore
            this.left && typeof this.left.inspect === 'function' ? this.left.inspect() : this.left
        })`
    }
}

class Right<L, R> extends Either<L, R> {
    map<R2>(fn: (right: R) => R2): Either<L, R2> {
        return new Right(undefined, fn(this.right));
    }

    ap(other: Either<L, ARG1<R>>): Either<L, RETURNS<R>> {
        if (isFNA1<ARG1<R>, RETURNS<R>>(this.right)) {
            return other.map(this.right);
        } else {
            throw new Error('This is not a apply function: ' + this.inspect())
        }
    }

    chain<R2>(fn: (right: R) => Either<L, R2>): Either<L, R2> {
        return fn(this.right);
    }

    bimap<L2, R2>(fnLeft: (left: L) => L2, fnRight: (right: R) => R2): Right<L2, R2> {
        return new Right<L2, R2>(undefined, fnRight(this.right));
    }

    mapLeft<L2>(fn: (left: L) => L2): Either<L2, R> {
        return new Right<L2, R>(undefined, this.right);
    }

    reduce<R2>(reducer: (accumulator: R2, value: R) => R2, initial: R2): R2 {
        return reducer(initial, this.right);
    }

    traverse<R2>(TypeRep: ApplicativeTypeRep<Either<L, R2>>, fn: (a: R) => Applicative<R2>): Applicative<Either<L, R2>> {
        return fn(this.right).map((a: R2) => new Right<L, R2>(undefined, a));
    }

    join(): Either<L, R | any> {
        return this.right instanceof Either ?
            this.right :
            this;
    };

    get(): R {
        return this.right;
    }

    getOrElse(other: R): R {
        return this.right;
    }

    swap(): Either<R, L> {
        return new Left<R, L>(this.right, this.left);
    }

    get isRight(): Boolean {
        return true;
    }

    inspect() {
        return `Either.Right(${
            // @ts-ignore
            this.right && typeof this.right.inspect === 'function' ? this.right.inspect() : this.right
        })`
    }
}
