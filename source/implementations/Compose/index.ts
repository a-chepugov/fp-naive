import {Applicative, ApplicativeTypeRep} from "../../interfaces/Applicative";

import {FNA1, isFNA1} from "../../interfaces/Function";

/**
 * @category Implementations
 * @description Creates Compose class constructor with two applicative signatures saved in closure
 * @param {object} F
 * @param {object} G
 * @returns {function}
 * @example
 * ComposeFactory(Identity, Maybe)
 */

export default function ComposeFactory<A>(F: ApplicativeTypeRep<any>, G: ApplicativeTypeRep<any>) {
    /**
     * @description Represents a composition of applicative types
     */
    return class Compose<A> implements Applicative<A> {
        private readonly value: Applicative<Applicative<A>>;

        private constructor(value: Applicative<Applicative<A>>) {
            this.value = value;
        }

        map<B>(fn: (a: A) => B): Compose<B> {
            return new Compose(this.value.map((x) => x.map(fn)));
        }

        ap<B>(other: Compose<B>): A extends FNA1<B, infer C> ? Compose<C> : Compose<any> {
            if (isFNA1<B, A extends FNA1<B, infer C> ? Compose<C> : any>(this.value)) {
                return other.map(this.value) as (A extends FNA1<B, infer C> ? Compose<C> : Compose<any>);
            } else {
                throw new Error('This is not a container of a function: ' + this.inspect());
            }
        }

        static of<A>(x: A): Compose<Applicative<Applicative<A>>> {
            return new Compose(F.of(G.of(x)));
        }

        get() {
            return this.value;
        }

        inspect() {
            return `Compose(${
                // @ts-ignore
                this.value && typeof this.value.inspect === 'function' ? this.value.inspect() : this.value
            })`;
        }
    }
}
