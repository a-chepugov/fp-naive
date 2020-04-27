import {Monad, Functor, Apply, Chain} from "../../interfaces/Monad";

export default class IO<A> implements Monad<A> {
    private readonly value: A & Function;

    constructor(value: A) {
        if (typeof value === 'function') {
            this.value = value;
        } else {
            throw new Error(`First argument must be a function. Got: ${value}.`)
        }

    }

    static of<A extends Function>(value: A): IO<() => A> {
        return new IO(() => value);
    }

    map<B>(fn: (value: A) => B & Function): IO<B & Function> {
        return new IO(fn(this.value));
    }

    ap<B>(applyFn: Apply<(value: A) => B & Function>): IO<B & Function> {
        return applyFn.map((fn: (value: A) => B) => fn.call(this, this.value)) as IO<B & Function>;
    }

    chain<B>(fn: (value: A) => IO<B & Function>): IO<B & Function> {
        return fn(this.value);
    }

    join() {
        return new IO(() => {
            return this.value().value();
        });
    }

    run() {
        return this.value();
    }

    get(): A {
        return this.value;
    }
}
