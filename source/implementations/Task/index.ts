import Monad from "../../specifications/Monad";
import Bifunctor from "../../specifications/Bifunctor";

/** @ignore */
type CB<I> = (i?: I) => any;
/** @ignore */
type Action<L, R> = (l: CB<L>, r: CB<R>) => any;

/**
 * @category Implementations
 * @description Represents an asynchronous computation model with possibility of fail and success
 * @typeParam L type of value than will be passed to left callback of action that contained in Task in case of failure
 * @typeParam R type of value than will be passed to right callback of action that contained in Task in case of success
 */
export default class Task<L, R> implements Monad<R>, Bifunctor<L, R> {
	protected readonly action: Action<L, R>;

	constructor(action: Action<L, R>) {
		if (typeof action === 'function') {
			this.action = action;
		} else {
			throw new Error(`First argument must be a function. Got: ${typeof action}.`)
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

	ap<R2>(other: Task<L, R2>): R extends (r: R2) => infer R3 ? Task<L, R3> : any {
		type R3 = R extends (r: R2) => infer R3 ? Task<L, R3> : any;
		return new Task((reject, resolve) => {
			return this.fork(reject, (r: R) => {
				const fn = r as unknown as (r: R2) => R3;
				return other.map<R3>(fn).fork(reject, resolve)
			});
		}) as (R extends (r: R2) => infer R3 ? Task<L, R3> : any);
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

	bichain<L2, R2>(fnL: (left: L) => Task<L2, R2>, fnR: (right: R) => Task<L2, R2>): Task<L2, R2> {
		return new Task((reject, resolve) => {
			return this.fork((l: L) => fnL(l).fork(reject, resolve), (r: R) => fnR(r).fork(reject, resolve));
		});
	}

	fork(reject: CB<L>, resolve: CB<R>): ReturnType<Action<L, R>> {
		return this.action(reject, resolve);
	}

	get(): Action<L, R> {
		return this.action;
	}

	join() {
		return this.bichain((a: any) => a, (a: any) => a);
	}

	inspect() {
		return `Task { ${this.action.toString()} }`;
	}
}
