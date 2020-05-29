import {Apply, ARG1, RETURNS, isFN, Chain, Monad} from "../../interfaces/Monad";
import Filterable from "../../interfaces/Filterable";

export default abstract class Maybe<A> implements Monad<A>, Filterable<A> {
    protected readonly value: A;

    protected constructor(value: A) {
        this.value = value;
    }

    abstract map<B>(fn: (value: A) => B): Maybe<B>;

    abstract ap(other: Apply<ARG1<A>>): Apply<RETURNS<A>>

    abstract chain<B>(fn: (value: A) => Chain<B>): Chain<B>

    static of<A>(value: A): Maybe<A> {
        return new Just<A>(value);
    }

    abstract filter(fn: (value: A) => Boolean): Maybe<A>

    abstract join(): Maybe<A | any>;

    abstract get(): A | never;

    abstract getOrElse(other: A): A;

    abstract getOrElseRun(fn: () => A): A;

    abstract inspect(): string;

    static just<A>(value: A): Just<A> {
        return new Just<A>(value);
    }

    static nothing<A>(value?: A): Nothing<A> {
        return new Nothing<A>(value);
    }

    static fromNullable<A>(value: A): Maybe<A> {
        return value === null || value === undefined ?
            new Nothing<A>(value) :
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

    ap(other: Apply<ARG1<A>>): Apply<RETURNS<A>> {
        type OUTPUT = RETURNS<A>;
        return new Nothing<OUTPUT>(undefined);
    }

    chain<B>(fn: (value: A) => Chain<B>): Chain<B> {
        return new Nothing<B>(undefined);
    }

    filter(fn: (value: A) => Boolean): Maybe<A> {
        return this;
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

    ap(other: Apply<ARG1<A>>): Apply<RETURNS<A>> {
        type INPUT = ARG1<A>;
        type OUTPUT = RETURNS<A>;

        if (isFN<INPUT, OUTPUT>(this.value)) {
            return other.map<OUTPUT>(this.value);
        } else {
            throw new Error('this.value is not a function: ' + this.inspect())
        }
    }

    chain<B>(fn: (value: A) => Chain<B>): Chain<B> {
        return fn(this.value);
    }

    filter(fn: (value: A) => Boolean): Maybe<A> {
        return fn(this.value) ?
            this :
            new Nothing<A>(undefined);
    }

    join<B>(): Maybe<A | any> {
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
