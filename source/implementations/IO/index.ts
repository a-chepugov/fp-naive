import Chain from "../../interfaces/Chain";
import Foldable from "../../interfaces/Foldable";

import * as ApplicativeModule from "../../interfaces/Applicative";

type Applicative<A> = ApplicativeModule.Applicative<A>;

export type FN = (...args: any[]) => any;
export type FN1<I, O> = (i: I) => O;
export type ARGS<F> = F extends (...args: any[]) => any ? Parameters<F> : Parameters<any>;
export type ARG1<F> = ARGS<F>[0]
export type RETURNS<F> = F extends (...args: any[]) => any ? ReturnType<F> : never

export default class IO<F extends FN> implements Applicative<F>, Chain<F>, Foldable<F> {
    private readonly action: F;

    constructor(action: F) {
        if (typeof action === 'function') {
            this.action = action;
        } else {
            throw new Error(`IO requires a function. Got: ${action}.`)
        }
    }

    map<F2 extends FN1<RETURNS<F>, RETURNS<F2>>>(fn: F2): IO<(...args: ARGS<F>) => RETURNS<F2>> {
        return new IO((...args: ARGS<F>) => fn(this.run(...args)));
    }

    static of<O>(value: O): IO<() => O> {
        return new IO(() => value);
    }

    ap(other: IO<FN1<ARG1<ARG1<F>>, RETURNS<String & ARG1<F>>>>)
        : IO<(...args: ARGS<F>) => RETURNS<RETURNS<F>>> {

        return new IO((...args: ARGS<F>) => {
            return (other.map(this.action(...args))
                // @ts-ignore
            ).run();
        });
    }

    // @ts-ignore
    chain<F2 extends (...args: ARGS<F>) => RETURNS<F2>>(fn: (action: F) => IO<F2>): IO<F2> {

        return new IO((...args: ARGS<F>) => {
                // @ts-ignore
                return fn(this.action).run(...args);
            }
        ) as IO<F2>;
    }

    reduce<B>(reducer: (accumulator: B, value: F) => B, initial: B): B {
        return reducer(initial, this.action);
    }

    join() {
        // @ts-ignore
        return new IO((...args: ARGS<F>) => this.run(...args).run());
    }

    run(...args: ARGS<F>): RETURNS<F> {
        return this.action(...args);
    }

    get(): F {
        return this.action;
    }

    inspect() {
        return `IO(${this.action.toString()})`
    }
}
