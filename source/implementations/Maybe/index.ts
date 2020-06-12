import Traversable from "../../specifications/Traversable";
import Filterable from "../../specifications/Filterable";

import Monad from "../../specifications/Monad";
import {Applicative, ApplicativeTypeRep} from "../../specifications/Applicative";

import {isFNA1, FNA1} from "../../specifications/Function";

/**
 * @category Implementations
 * @description Polymorphic container that encapsulates an optional value
 * @typeParam A type of values than could be contained in Maybe
 */
export default abstract class Maybe<A> implements Monad<A>, Filterable<A>, Traversable<A> {
    protected constructor() {
    }

    abstract map<B>(fn: (a: A) => B): Maybe<B>;

    abstract ap<B>(other: Maybe<B>): A extends FNA1<B, infer C> ? Maybe<C> : Maybe<any>;

    abstract chain<B>(fn: (value: A) => Maybe<B>): Maybe<B>;

    static of<A>(value: A): Maybe<A> {
        return new Just<A>(value);
    }

    abstract filter(fn: (value: A) => Boolean): Maybe<A>;

    abstract reduce<B>(reducer: (accumulator: B, value: A) => B, initial: B): B;

    abstract traverse<B>(TypeRep: ApplicativeTypeRep<Maybe<B>>, fn: (a: A) => Applicative<B>): Applicative<Maybe<B>>;

    abstract join(): Maybe<A | any>;

    abstract get(): A | never;

    abstract getOrElse(other: A): A;

    abstract getOrElseRun(fn: () => A): A;

    abstract inspect(): string;

    static just<A>(value: A): Just<A> {
        return new Just<A>(value);
    }

    static nothing<A>(_?: A): Nothing<A> {
        return new Nothing<A>();
    }

    static fromNullable<A>(value?: A): Maybe<A> {
        return value === null || value === undefined ?
            new Nothing<A>() :
            new Just<A>(value);
    }

    get isJust(): Boolean {
        return false;
    }

    get isNothing(): Boolean {
        return false;
    }
}

/**
 * @ignore
 * @description Represents absence of a value
 */
class Nothing<A> extends Maybe<A> {
    constructor() {
        super();
    }

    map<B>(fn: (a: A) => B): Nothing<B> {
        return new Nothing<B>();
    }

    ap<B>(other: Maybe<B>): A extends FNA1<B, infer C> ? Nothing<C> : Nothing<any> {
        return new Nothing() as (A extends FNA1<B, infer C> ? Nothing<C> : Nothing<any>);
    }

    chain<B>(fn: (value: A) => Maybe<B>): Nothing<B> {
        return new Nothing<B>();
    }

    filter(fn: (value: A) => Boolean): Nothing<A> {
        return this;
    }

    reduce<B>(reducer: (accumulator: B, value: A) => B, initial: B): B {
        return undefined;
    }

    traverse<B>(TypeRep: ApplicativeTypeRep<Maybe<B>>, fn: (a: A) => Applicative<B>): Applicative<Maybe<B>> {
        return TypeRep.of(new Nothing<B>());
    }

    join(): Nothing<A> {
        return this;
    };

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

    inspect() {
        return `Maybe.Nothing { }`;
    }
}

/**
 * @ignore
 * @description Represents presence of a value
 */
class Just<A> extends Maybe<A> {
    protected readonly value: A;

    constructor(value: A) {
        super();
        this.value = value;
    }

    map<B>(fn: (a: A) => B): Maybe<B> {
        return Maybe.fromNullable(fn(this.value));
    }

    ap<B>(other: Maybe<B>): A extends FNA1<B, infer C> ? Maybe<C> : Maybe<any> {
        if (isFNA1<B, A extends FNA1<B, infer C> ? Just<C> : any>(this.value)) {
            return other.map(this.value) as (A extends FNA1<B, infer C> ? Maybe<C> : any);
        } else {
            throw new Error('This is not a container of a function: ' + this.inspect());
        }
    }

    chain<B>(fn: (value: A) => Maybe<B>): Maybe<B> {
        return fn(this.value);
    }

    filter(fn: (value: A) => Boolean): Maybe<A> {
        return fn(this.value) ?
            this :
            new Nothing<A>();
    }

    reduce<B>(reducer: (accumulator: B, value: A) => B, initial: B): B {
        return reducer(initial, this.value);
    }

    traverse<B>(TypeRep: ApplicativeTypeRep<Maybe<B>>, fn: (a: A) => Applicative<B>): Applicative<Maybe<B>> {
        return fn(this.value).map((x: B) => new Just(x));
    }

    join(): Maybe<A | any> {
        return this.value instanceof Maybe ?
            this.value :
            this;
    };

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

    inspect() {
        return `Maybe.Just { ${
            // @ts-ignore
            this.value && typeof this.value.inspect === 'function' ? this.value.inspect() : this.value
        } }`;
    }
}
