import {Monad, Functor, Apply, Chain} from "../../interfaces/Monad";

export default class IO<A> implements Monad<A> {
    private readonly fn: A & Function;

    constructor(fn: A) {
        if (typeof fn === 'function') {
            this.fn = fn;
        } else {
            throw new Error(`First argument must be a function. Got: ${fn}.`)
        }
    }

    static of<A>(value: A): IO<() => A> {
        return new IO(() => value);
    }

    map<B>(fn: (value: A) => B & Function): IO<B & Function> {
        return new IO(fn(this.fn));
    }

    ap<B>(applyFn: Apply<(value: A) => B & Function>): IO<B & Function> {
        return applyFn.map((fn: (value: A) => B) => fn.call(this, this.fn)) as IO<B & Function>;
    }

    chain<B>(fn: (value: A) => IO<B & Function>): IO<B & Function> {
        return fn(this.fn);
    }

    join() {
        return new IO(() => this.run().run());
    }

    run(...args: any[]) {
        return this.fn.apply(this, args);
    }

    get(): A {
        return this.fn;
    }

    inspect() {
        return `IO(${
            // @ts-ignore
            this.fn && typeof this.fn.inspect === 'function' ? this.fn.inspect() : this.fn
        })`
    }
}
