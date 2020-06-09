import Filterable from "../../specifications/Filterable";
import Traversable from "../../specifications/Traversable";
import Monoid from "../../specifications/Monoid";

import {Applicative, ApplicativeTypeRep} from "../../specifications/Applicative";

import {isFNA1, FNA1} from "../../specifications/Function";

/**
 * @category Implementations
 * @description Represents a structure of ordered values
 * @typeParam A type of values contained in List
 */
export default class List<A> implements Applicative<A>, Filterable<A>, Traversable<A>, Monoid<A> {
    protected readonly values: Array<A>;

    constructor(values: Array<A>) {
        this.values = values;
    }

    map<B>(fn: (a: A) => B): List<B> {
        return new List(this.values.map(fn));
    }

    ap<B>(other: List<B>): A extends FNA1<B, infer C> ? List<C> : any {
        const fn = this.values[0];
        if (isFNA1<B, A extends FNA1<B, infer C> ? List<C> : any>(fn)) {
            return other.map(fn) as (A extends FNA1<B, infer C> ? List<C> : any);
        } else {
            throw new Error('This is not a container of a function: ' + this.inspect());
        }
    }

    static of<A>(value: A): List<A> {
        return new List<A>([value]);
    }

    filter(fn: (value: A) => Boolean): List<A> {
        return new List(this.values.filter(fn));
    }

    reduce<B>(reducer: (accumulator: B, value: A) => B, initial: B): B {
        return this.values.reduce(reducer, initial);
    }

    traverse<B>(TypeRep: ApplicativeTypeRep<List<B>>, fn: (a: A) => Applicative<B>): Applicative<List<B>> {
        type addToListType = (list: List<B>) => List<B>;

        const addToList = (item: B): addToListType => (list: List<B>): List<B> => list.concat(new List([item]));

        return this.values.reduce(
            (accumulator: Applicative<List<B>> | null, item: A): Applicative<List<B>> => {
                return accumulator ?
                    fn(item).map(addToList).ap(accumulator) :
                    fn(item).map(List.of)
            },
            null
        ) as Applicative<List<B>>;

    }

    concat(other: List<A>): List<A> {
        return new List(this.values.concat(other.get()));
    }

    static empty<A>() {
        return new List<A>([]);
    }

    get(): Array<A> {
        return this.values;
    }

    inspect() {
        // @ts-ignore
        return `List(${this.values.map((item) => item && typeof item.inspect === 'function' ? item.inspect() : `${item}`)})`;
    }
}
