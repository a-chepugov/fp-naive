import Traversable from "../../interfaces/Traversable";

import * as MonadModule from "../../interfaces/Monad";

type Monad<A> = MonadModule.Monad<A>;
type Applicative<A> = MonadModule.Applicative.Applicative<A>;
type ApplicativeTypeRep<A> = MonadModule.Applicative.ApplicativeTypeRep<A>;
type ARG1<A> = MonadModule.Chain.Apply.ARG1<A>;
type RETURNS<A> = MonadModule.Chain.Apply.RETURNS<A>;
const isFN = MonadModule.Chain.Apply.isFN;

import Filterable from "../../interfaces/Filterable";

export default abstract class Maybe<A> implements Monad<A>, Filterable<A>, Traversable<A> {
    protected readonly value: A;

    protected constructor(value: A) {
        this.value = value;
    }

    abstract map<B>(fn: (value: A) => B): Maybe<B>;

    abstract ap(other: Maybe<ARG1<A>>): Maybe<RETURNS<A>> | never

    abstract chain<B>(fn: (value: A) => Maybe<B>): Maybe<B>

    static of<A>(value: A): Maybe<A> {
        return new Just<A>(value);
    }

    abstract filter(fn: (value: A) => Boolean): Maybe<A>

    abstract reduce<B>(reducer: (accumulator: B, value: A) => B, initial: B): B;

    abstract traverse<B>(TypeRep: ApplicativeTypeRep<Maybe<B>>, fn: (a: A) => Applicative<B>): Applicative<Maybe<B>>

    abstract join(): Maybe<A | any>;

    abstract get(): A | never;

    abstract getOrElse(other: A): A;

    abstract getOrElseRun(fn: () => A): A;

    abstract inspect(): string;

    static just<A>(value: A): Just<A> {
        return new Just<A>(value);
    }

    static nothing<A>(_?: A): Nothing<A> {
        return new Nothing<A>(undefined);
    }

    static fromNullable<A>(value: A): Maybe<A> {
        return value === null || value === undefined ?
            new Nothing<A>(undefined) :
            new Just<A>(value);
    }

    get isJust(): Boolean {
        return false;
    }

    get isNothing(): Boolean {
        return false;
    }
}

class Nothing<A> extends Maybe<A> {
    map<B>(fn: (value: A) => B): Maybe<B> {
        return new Nothing<B>(undefined);
    }

    ap(other: Maybe<ARG1<A>>): Maybe<RETURNS<A>> {
        return new Nothing<RETURNS<A>>(undefined);
    }

    chain<B>(fn: (value: A) => Maybe<B>): Maybe<B> {
        return new Nothing<B>(undefined);
    }

    filter(fn: (value: A) => Boolean): Maybe<A> {
        return this;
    }

    reduce<B>(reducer: (accumulator: B, value: A) => B, initial: B): B {
        return undefined;
    }

    traverse<B>(TypeRep: ApplicativeTypeRep<Maybe<B>>, fn: (a: A) => Applicative<B>): Applicative<Maybe<B>> {
        return TypeRep.of(new Nothing<B>(undefined));
    }

    join(): Maybe<A> {
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
        return `Maybe.Nothing(${
            // @ts-ignore
            this.value && typeof this.value.inspect === 'function' ? this.value.inspect() : this.value
        })`
    }
}

class Just<A> extends Maybe<A> {
    map<B>(fn: (value: A) => B): Maybe<B> {
        return Maybe.fromNullable(fn(this.value));
    }

    ap(other: Maybe<ARG1<A>>): Maybe<RETURNS<A>> | never {
        if (isFN<ARG1<A>, RETURNS<A>>(this.value)) {
            return other.map(this.value);
        } else {
            throw new Error('This is not a apply function: ' + this.inspect())
        }
    }

    chain<B>(fn: (value: A) => Maybe<B>): Maybe<B> {
        return fn(this.value);
    }

    filter(fn: (value: A) => Boolean): Maybe<A> {
        return fn(this.value) ?
            this :
            new Nothing<A>(undefined);
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
        return `Maybe.Just(${
            // @ts-ignore
            this.value && typeof this.value.inspect === 'function' ? this.value.inspect() : this.value
        })`
    }
}
