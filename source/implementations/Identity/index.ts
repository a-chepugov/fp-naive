import Traversable from "../../specifications/Traversable";

import Monad from "../../specifications/Monad";
import {Applicative, ApplicativeTypeRep} from "../../specifications/Applicative";

import {isFNA1, FNA1} from "../../specifications/Function";

/**
 * @category Implementations
 * @description The simplest container
 * @typeParam A type of value contained in Identity
 */
export default class Identity<A> implements Monad<A>, Traversable<A> {
	private readonly value: A;

	constructor(value: A) {
		this.value = value;
	}

	map<B>(fn: (a: A) => B): Identity<B> {
		return new Identity(fn(this.value));
	}

	ap<B>(other: Identity<B>): A extends FNA1<B, infer C> ? Identity<C> : Identity<any> {
		if (isFNA1<B, A extends FNA1<B, infer C> ? Identity<C> : any>(this.value)) {
			return other.map(this.value) as (A extends FNA1<B, infer C> ? Identity<C> : Identity<any>);
		} else {
			throw new Error('This is not a container of a function: ' + this.inspect());
		}
	}

	static of<A>(value: A): Identity<A> {
		return new Identity<A>(value);
	}

	chain<B>(fn: (value: A) => Identity<B>): Identity<B> {
		return fn(this.value);
	}

	reduce<B>(reducer: (accumulator: B, value: A) => B, initial: B): B {
		return reducer(initial, this.value);
	}

	traverse<B>(TypeRep: ApplicativeTypeRep<Identity<B>>, fn: (a: A) => Applicative<B>): Applicative<Identity<B>> {
		return fn(this.value).map(Identity.of);
	}

	get(): A {
		return this.value;
	}

	join(): Identity<A | any> {
		return this.value instanceof Identity ?
			this.value :
			this;
	};

	inspect() {
		return `Identity { ${
			// @ts-ignore
			this.value && typeof this.value.inspect === 'function' ? this.value.inspect() : this.value
		} }`;
	}
}
