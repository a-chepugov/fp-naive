import Traversable from "../../interfaces/Traversable";

import Bifunctor from "../../interfaces/Bifunctor";

import Monad from "../../interfaces/Monad";
import {Applicative, ApplicativeTypeRep} from "../../interfaces/Applicative";

import {isFNA1, FNA1} from "../../interfaces/Function";

export default abstract class Either<L, R> implements Monad<R>, Bifunctor<L, R>, Traversable<R> {

    abstract map<R2>(fn: (a: R) => R2): Either<L, R2>;

    abstract ap<R2>(other: Either<any, R2>): R extends FNA1<R2, infer R3> ? Either<L, R3> : Either<any, any>;

    abstract chain<R2>(fn: (right: R) => Either<L, R2>): Either<L, R2>;

    static of<L, R>(right: R): Either<L, R> {
        return new Right<L, R>(undefined, right);
    }

    abstract bimap<L2, R2>(fnLeft: (left: L) => L2, fnRight: (right: R) => R2): Either<L2, R2>;

    abstract mapLeft<L2>(fn: (left: L) => L2): Either<L2, R>;

    abstract reduce<R2>(reducer: (accumulator: R2, value: R) => R2, initial: R2): R2;

    abstract traverse<R2>(TypeRep: ApplicativeTypeRep<Either<L, R2>>, fn: (a: R) => Applicative<R2>): Applicative<Either<L, R2>>;

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
    private value: L;

    constructor(left: L, _right: R) {
        super();
        this.value = left;
    }

    map<R2>(fn: (a: R) => R2): Either<L, R2> {
        return new Left<L, R2>(this.value, undefined);
    }

    ap<R2>(other: Either<any, R2>): R extends FNA1<R2, infer R3> ? Either<L, R3> : Either<any, any> {
        return new Left(this.value, undefined) as unknown as (R extends FNA1<R2, infer R3> ? Either<L, R3> : Either<any, any>);
    }

    chain<R2>(fn: (right: R) => Either<L, R2>): Either<L, R2> {
        return new Left<L, R2>(this.value, undefined);
    }

    bimap<L2, R2>(fnLeft: (left: L) => L2, fnRight: (right: R) => R2): Left<L2, R2> {
        return new Left<L2, R2>(fnLeft(this.value), undefined);
    }

    reduce<R2>(reducer: (accumulator: R2, value: R) => R2, initial: R2): R2 {
        return undefined;
    }

    traverse<R2>(TypeRep: ApplicativeTypeRep<Either<L, R2>>, fn: (a: R) => Applicative<R2>): Applicative<Either<L, R2>> {
        return TypeRep.of(new Left<L, R2>(undefined, undefined));
    }

    mapLeft<L2>(fn: (left: L) => L2): Either<L2, R> {
        return new Left<L2, R>(fn(this.value), undefined);
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
        return new Right<R, L>(undefined, this.value);
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

class Right<L, R> extends Either<L, R> {
    private value: R;

    constructor(_left: L, right: R) {
        super();
        this.value = right;
    }

    map<R2>(fn: (a: R) => R2): Either<L, R2> {
        return new Right<L, R2>(undefined, fn(this.value));
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
        return new Right<L2, R2>(undefined, fnRight(this.value));
    }

    mapLeft<L2>(fn: (left: L) => L2): Either<L2, R> {
        return new Right<L2, R>(undefined, this.value);
    }

    reduce<R2>(reducer: (accumulator: R2, value: R) => R2, initial: R2): R2 {
        return reducer(initial, this.value);
    }

    traverse<R2>(TypeRep: ApplicativeTypeRep<Either<L, R2>>, fn: (a: R) => Applicative<R2>): Applicative<Either<L, R2>> {
        return fn(this.value).map((a: R2) => new Right<L, R2>(undefined, a));
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
        return new Left<R, L>(this.value, undefined);
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
