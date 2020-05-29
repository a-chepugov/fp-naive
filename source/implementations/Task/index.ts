import * as MonadModule from "../../interfaces/Monad";

type Monad<A> = MonadModule.Monad<A>;
type Apply<A> = MonadModule.Chain.Apply.Apply<A>;
type ARG1<A> = MonadModule.Chain.Apply.ARG1<A>;
type RETURNS<A> = MonadModule.Chain.Apply.RETURNS<A>;
const isFN = MonadModule.Chain.Apply.isFN;


import compose from "../../utilities/compose";
import identity from "../../utilities/identity";

type FN = (...args: any[]) => any

export default class Task<A> implements Monad<A> {
    private readonly fork: A & Function;

    constructor(fork: A) {
        if (typeof fork === 'function') {
            this.fork = fork;
        } else {
            throw new Error(`First argument must be a function. Got: ${fork}.`)
        }
    }

    static of<A>(a: A) {
        return new Task((_: FN, resolve: FN) => resolve(a));
    }

    static rejected<A>(a: A) {
        return new Task((reject: FN, _: FN) => reject(a));
    }

    static resolved<A>(a: A) {
        return new Task((_: FN, resolve: FN) => resolve(a));
    }

    map(fn: (...args: any[]) => any) {
        return new Task((reject: FN, resolve: FN) =>
            this.fork(reject, compose(resolve, fn)));
    }

    ap(other: Apply<ARG1<A>>): Apply<RETURNS<A>> {
        if (isFN<ARG1<A>, RETURNS<A>>(this.fork)) {
            return other.map(this.fork);
        } else {
            throw new Error('this.value is not a function: ' + this.inspect())
        }
    }

    chain(fn: FN) {
        return new Task((reject: FN, resolve: FN) => this.fork(reject, (x: any) => fn(x).fork(reject, resolve)));
    }

    join() {
        return this.chain(identity);
    }

    run(...args: any[]) {
        return this.fork.apply(this, args);
    }

    get(): A {
        return this.fork;
    }

    inspect() {
        return `Task(${
            // @ts-ignore
            this.fork && typeof this.fork.inspect === 'function' ? this.fork.inspect() : this.fork
        })`
    }

}
