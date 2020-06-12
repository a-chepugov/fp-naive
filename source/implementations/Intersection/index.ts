import Filterable from "../../specifications/Filterable";
import Traversable from "../../specifications/Traversable";
import Semigroup from "../../specifications/Semigroup";

import {Applicative, ApplicativeTypeRep} from "../../specifications/Applicative";

import {isFNA1, FNA1} from "../../specifications/Function";

/**
 * @category Implementations
 * @description Represents a structure that can participate in the intersection operation
 * @typeParam A type of values contained in Intersection
 */
export default class Intersection<A> implements Applicative<A>, Filterable<A>, Traversable<A>, Semigroup<A> {
    protected readonly values: Set<A>;

    constructor(values: Iterable<A>) {
        this.values = new Set(values);
    }

    map<B>(fn: (a: A) => B): Intersection<B> {
        return new Intersection(Array.from(this.values.values(), fn));
    }

    ap<B>(other: Intersection<B>): A extends FNA1<B, infer C> ? Intersection<C> : any {
        const fn = this.values.values().next().value;
        if (isFNA1<B, A extends FNA1<B, infer C> ? Intersection<C> : any>(fn)) {
            return other.map(fn) as (A extends FNA1<B, infer C> ? Intersection<C> : any);
        } else {
            throw new Error('This is not a container of a function: ' + this.inspect());
        }
    }

    static of<A>(value: A): Intersection<A> {
        return new Intersection<A>([value]);
    }

    filter(fn: (value: A) => Boolean): Intersection<A> {
        return new Intersection(Array.from(this.values.values()).filter(fn));
    }

    reduce<B>(reducer: (accumulator: B, value: A) => B, initial: B): B {
        return Array.from(this.values.values()).reduce(reducer, initial);
    }

    traverse<B>(TypeRep: ApplicativeTypeRep<Intersection<B>>, fn: (a: A) => Applicative<B>): Applicative<Intersection<B>> {
        type addToIntersectionType = (list: Intersection<B>) => Intersection<B>;

        const addToIntersection = (item: B): addToIntersectionType => (list: Intersection<B>): Intersection<B> => list.concat(new Intersection([item]));

        return Array.from(this.values.values()).reduce(
            (accumulator: Applicative<Intersection<B>> | null, item: A): Applicative<Intersection<B>> => {
                return accumulator ?
                    fn(item).map(addToIntersection).ap(accumulator) :
                    fn(item).map(Intersection.of)
            },
            null
        ) as Applicative<Intersection<B>>;

    }

    /**
     * @param {Intersection} other
     * @returns {Intersection} elements present in both sets
     */
    concat(other: Intersection<A>): Intersection<A> {
        const otherValues = other.get();
        const intersection = Array.from(this.values.values()).filter((item) => otherValues.find((otherItem) => otherItem === item));
        return new Intersection(intersection);
    }

    static empty<A>() {
        return new Intersection<A>([]);
    }

    get(): Array<A> {
        return Array.from(this.values.values());
    }

    inspect() {
        // @ts-ignore
        return `Intersection { ${Array.from(this.values.values()).map((item) => item && typeof item.inspect === 'function' ? item.inspect() : `${item}`). join(', ')} }`;
    }
}
