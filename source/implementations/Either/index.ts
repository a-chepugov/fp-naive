import Traversable from "../../specifications/Traversable";

import Bifunctor from "../../specifications/Bifunctor";

import Monad from "../../specifications/Monad";
import {Applicative, ApplicativeTypeRep} from "../../specifications/Applicative";

import {isFNA1, FNA1} from "../../specifications/Function";

/**
 * @description Provided model of returning and propagating errors for computation that could fail
 * @typeParam L an error value
 * @typeParam R a success value
 * @category Implementations
 */
export default abstract class Either<L, R> implements Monad<R>, Bifunctor<L, R>, Traversable<R> {
    protected constructor() {
    }

    abstract map<R2>(fn: (a: R) => R2): Either<L, R2>;

    abstract ap<R2>(other: Either<any, R2>): R extends FNA1<R2, infer R3> ? Either<L, R3> : Either<any, any>;

    abstract chain<R2>(fn: (right: R) => Either<L, R2>): Either<L, R2>;

    static of<L, R>(right: R): Either<L, R> {
        return new Right<L, R>(right);
    }

    abstract bimap<L2, R2>(fnLeft: (left: L) => L2, fnRight: (right: R) => R2): Either<L2, R2>;

    abstract mapLeft<L2>(fn: (left: L) => L2): Either<L2, R>;

    abstract reduce<R2>(reducer: (accumulator: R2, value: R) => R2, initial: R2): R2;

    abstract traverse<R2>(TypeRep: ApplicativeTypeRep<Either<L, R2>>, fn: (a: R) => Applicative<R2>): Applicative<Either<L, R2>>;

    abstract get(): L | R ;

    abstract getOrElse(other: R): R;

    static right<L, R>(right: R): Right<L, R> {
        return new Right<L, R>(right);
    }

    static left<L, R>(left: L): Left<L, R> {
        return new Left<L, R>(left);
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

/**
 * @category Inner classes
 * @description Represents failure and contains an error value
 */
class Left<L, R> extends Either<L, R> {
    private readonly value: L;

    constructor(value: L) {
        super();
        this.value = value;
    }

    map<R2>(fn: (a: R) => R2): Left<L, R2> {
        return new Left<L, R2>(this.value);
    }

    ap<R2>(other: Either<any, R2>): R extends FNA1<R2, infer R3> ? Either<L, R3> : Either<any, any> {
        return new Left(this.value) as (R extends FNA1<R2, infer R3> ? Left<L, R3> : Left<any, any>);
    }

    chain<R2>(fn: (right: R) => Either<L, R2>): Either<L, R2> {
        return new Left<L, R2>(this.value);
    }

    bimap<L2, R2>(fnLeft: (left: L) => L2, fnRight: (right: R) => R2): Left<L2, R2> {
        return new Left<L2, R2>(fnLeft(this.value));
    }

    reduce<R2>(reducer: (accumulator: R2, value: R) => R2, initial: R2): R2 {
        return undefined;
    }

    traverse<R2>(TypeRep: ApplicativeTypeRep<Either<L, R2>>, fn: (a: R) => Applicative<R2>): Applicative<Either<L, R2>> {
        return TypeRep.of(new Left<L, R2>(undefined));
    }

    mapLeft<L2>(fn: (left: L) => L2): Left<L2, R> {
        return new Left<L2, R>(fn(this.value));
    }

    join(): Either<L, R> {
        return this;
    };

    get(): L {
        return this.value;
    }

    getOrElse(other: R): R {
        return other;
    }

    swap(): Either<R, L> {
        return new Right<R, L>(this.value);
    }

    get isLeft(): Boolean {
        return true;
    }

    inspect() {
        return `Either.Left(${
            // @ts-ignore
            this.value && typeof this.value.inspect === 'function' ? this.value.inspect() : this.value
        })`;
    }
}

/**
 * @category Inner classes
 * @description Represents success and contains a proper result value
 */
class Right<L, R> extends Either<L, R> {
    private readonly value: R;

    constructor(value: R) {
        super();
        this.value = value;
    }

    map<R2>(fn: (a: R) => R2): Either<L, R2> {
        return new Right<L, R2>(fn(this.value));
    }

    ap<R2>(other: Either<any, R2>): R extends FNA1<R2, infer R3> ? Either<L, R3> : Either<any, any> {
        if (isFNA1<R2, R extends FNA1<R2, infer R3> ? Either<L, R3> : Either<any, any>>(this.value)) {
            return other.map(this.value) as (R extends FNA1<R2, infer R3> ? Either<L, R3> : Either<any, any>);
        } else {
            throw new Error('This is not a container of a function: ' + this.inspect());
        }
    }

    chain<R2>(fn: (right: R) => Either<L, R2>): Either<L, R2> {
        return fn(this.value);
    }

    bimap<L2, R2>(fnLeft: (left: L) => L2, fnRight: (right: R) => R2): Right<L2, R2> {
        return new Right<L2, R2>(fnRight(this.value));
    }

    mapLeft<L2>(fn: (left: L) => L2): Either<L2, R> {
        return new Right<L2, R>(this.value);
    }

    reduce<R2>(reducer: (accumulator: R2, value: R) => R2, initial: R2): R2 {
        return reducer(initial, this.value);
    }

    traverse<R2>(TypeRep: ApplicativeTypeRep<Either<L, R2>>, fn: (a: R) => Applicative<R2>): Applicative<Either<L, R2>> {
        return fn(this.value).map((a: R2) => new Right<L, R2>(a));
    }

    join(): Either<L, R | any> {
        return this.value instanceof Either ?
            this.value :
            this;
    };

    get(): R {
        return this.value;
    }

    getOrElse(other: R): R {
        return this.value;
    }

    swap(): Either<R, L> {
        return new Left<R, L>(this.value);
    }

    get isRight(): Boolean {
        return true;
    }

    inspect() {
        return `Either.Right(${
            // @ts-ignore
            this.value && typeof this.value.inspect === 'function' ? this.value.inspect() : this.value
        })`;
    }
}
