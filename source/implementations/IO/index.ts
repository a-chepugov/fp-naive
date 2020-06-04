import Monad from "../../interfaces/Monad";

import {isFNA1, FNA1} from "../../interfaces/Function";

/**
 * @category Implementations
 * @description Represents a deferred computation model
 */
export default class IO<A> implements Monad<A> {
    private readonly action: () => A;

    constructor(action: () => A) {
        if (typeof action === 'function') {
            this.action = action;
        } else {
            throw new Error(`IO requires a function. Got: ${action}.`)
        }
    }

    map<B>(fn: (a: A) => B): IO<B> {
        return new IO(() => fn(this.action()));
    }

    ap<B>(other: IO<B>): A extends FNA1<B, infer C> ? IO<C> : never {
        type C = A extends FNA1<B, infer C> ? C : never;
        if (isFNA1<B, A extends FNA1<B, infer C> ? IO<C> : never>(this.action)) {
            return new IO(() => {
                const fn = this.action() as unknown as (b: B) => C;
                return other.map(fn).run();
            }) as (A extends FNA1<B, infer C> ? IO<C> : never);
        } else {
            throw new Error('This is not a container of a function: ' + this.inspect());
        }
    }

    static of<A>(value: A): IO<A> {
        return new IO<A>(() => value);
    }

    chain<B>(fn: (action: A) => IO<B>): IO<B> {
        return new IO(() => fn(this.action()).run());
    }

    join() {
        return new IO(() => (this.run() as unknown as IO<any>).run());
    }

    run(): A {
        return this.action();
    }

    get(): () => A {
        return this.action;
    }

    inspect() {
        return `IO(${this.action.toString()})`;
    }
}
