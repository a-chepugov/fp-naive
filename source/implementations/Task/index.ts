import Monad from "../../specifications/Monad";
import Bifunctor from "../../specifications/Bifunctor";

import {isFNA1, FNA1} from "../../specifications/Function";

/** @ignore */
export type CB<H> = FNA1<H, Task<any, any> | any>;
/** @ignore */
export type Action<L, R> = (l: CB<L>, r: CB<R>) => ReturnType<typeof l> | ReturnType<typeof r> ;
/** @ignore */
enum STATE { PENDING = -1, REJECTED, RESOLVED }

/**
 * @category Implementations
 * @description Represents an asynchronous computation model with possibility of fail and success
 * @typeParam L type of value than will be passed to left callback of action that contained in Task in case of failure
 * @typeParam R type of value than will be passed to right callback of action that contained in Task in case of success
 */
export default class Task<L, R> implements Monad<R>, Bifunctor<L, R> {
    protected readonly action: Action<L, R>;
    protected state: STATE;

    constructor(action: Action<L, R>) {
        if (typeof action === 'function') {
            this.action = action;
            this.state = STATE.PENDING;
        } else {
            throw new Error(`First argument must be a function. Got: ${action}.`)
        }
    }

    static rejected<L, R>(a: L) {
        return new Task((reject: CB<L>, _resolve: CB<R>) => reject(a));
    }

    static resolved<L, R>(a: R) {
        return new Task((_reject: CB<L>, resolve: CB<R>) => resolve(a));
    }

    map<R2>(fn: (a: R) => R2): Task<L, R2> {
        return new Task((reject: CB<L>, resolve: CB<R2>) =>
            this.fork(reject, (r: R) => resolve(fn(r)))
        )
    }

    ap<R2>(other: Task<L, R2>): R extends FNA1<R2, infer R3> ? Task<L, R3> : any {
        type R3 = R extends FNA1<R2, infer R3> ? Task<L, R3> : any;
        if (isFNA1<R2, R extends FNA1<R2, infer R3> ? Task<L, R3> : never>(this.action)) {
            return new Task((reject, resolve) => {
                return this.fork(reject, (r: R) => {
                    const fn = r as unknown as (a: R2) => R3;
                    return other.map<R3>(fn).fork(reject, resolve)
                });
            }) as (R extends FNA1<R2, infer R3> ? Task<L, R3> : any);
        } else {
            throw new Error('This is not a container of a function: ' + this.inspect());
        }
    }

    chain<R2>(fn: (right: R) => Task<L, R2>): Task<L, R2> {
        return new Task((reject, resolve) => {
            return this.fork(reject, (r: R) => fn(r).fork(reject, resolve));
        });
    }

    static of<L, R>(a: R) {
        return Task.resolved(a);
    }

    bimap<L2, R2>(fnLeft: (left: L) => L2, fnRight: (right: R) => R2): Task<L2, R2> {
        return new Task<L2, R2>((reject: CB<L2>, resolve: CB<R2>) =>
            this.fork((l: L) => reject(fnLeft(l)), (r: R) => resolve(fnRight(r)))
        )
    }

    fork(reject: CB<L>, resolve: CB<R>) {
        return this.action(
            (result: L) => {
                reject(result);
                this.state = STATE.REJECTED;
                return Task.rejected<L, R>(result)
            },
            (result: R) => {
                resolve(result);
                this.state = STATE.RESOLVED;
                return Task.resolved<L, R>(result)
            });
    }

    get(): Action<L, R> {
        return this.action;
    }

    join() {
        return this.chain((a: any) => a);
    }

    inspect() {
        return `Task.${STATE[this.state]} (${this.action.toString()})`;
    }
}
