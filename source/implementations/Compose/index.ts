import {Applicative, ApplicativeTypeRep} from "../../interfaces/Applicative";
import {FNA1, isFNA1} from "../../interfaces/Function";

/**
 * @category Implementations
 * @description Creates Compose class constructor with two applicative signatures saved in closure
 * @param {object} F
 * @param {object} G
 * @returns {function}
 * @example
 * ComposeFactory(Identity, Maybe).of(5); // Compose(Identity(Maybe(5)))
 */
export default function ComposeFactory<A0>(F: ApplicativeTypeRep<any>, G: ApplicativeTypeRep<A0>) {
    type AP1<T> = Applicative<T>;
    type AP2<T> = Applicative<AP1<T>>;
    type AP3<T> = Applicative<AP2<T>>;

    /**
     * @description Represents a composition of applicative types
     */
    return class Compose<A> implements AP3<A> {
        private readonly value: any;

        private constructor(value: AP2<A>) {
            this.value = value;
        }

        // @ts-ignore
        map<B>(fn: (a: A) => B): Compose<B> {
            return new Compose<B>(this.value.map((x: AP1<A>) => x.map((a: A) => fn(a) as B) as AP1<B>) as AP2<B>);
        }

        ap<B>(other: Compose<B>): A extends FNA1<B, infer C> ? Compose<C> : Compose<any> {
            if (isFNA1<B, A extends FNA1<B, infer C> ? Compose<C> : any>(this.value)) {
                return other.map(this.value) as (A extends FNA1<B, infer C> ? Compose<C> : Compose<any>);
            } else {
                throw new Error('This is not a container of a function: ' + this.inspect());
            }
        }

        static of(x: A0): Compose<A0> {
            return new Compose(F.of(G.of(x)));
        }

        get(): AP2<A> {
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
