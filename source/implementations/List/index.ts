import {Apply, Applicative} from "../../interfaces/Applicative";
import {Filterable} from "../../interfaces/Filterable";
import {Traversable} from "../../interfaces/Traversable";

export default class List<A> implements Applicative<A>, Filterable<A>, Traversable<A> {
    protected readonly value: Array<A>;

    constructor(value: Array<A>) {
        this.value = value;
    }

    static of<A>(value: A): List<A> {
        return new List<A>([value]);
    }

    map<B>(fn: (value: A) => B): List<B> {
        return new List(this.value.map(fn));
    }

    ap<B>(other: Apply<(value: A) => B>): List<B> {
        const list = new Array<B>(this.value.length);

        this.value.forEach((value, index) => other.map((fn) => {
            list[index] = fn(value);
        }));

        return new List(list);
    }

    filter(fn: (value: A) => Boolean): List<A> {
        return new List(this.value.filter(fn));
    }

    reduce<B>(reducer: (accumulator: B, value: A) => B, initial?: B): B {
        return this.value.reduce(reducer, initial);
    }

    traverse<B>(
        applicativeTypeRep: { of: (value: List<B>) => Applicative<List<B>> },
        fn: (a: A) => Applicative<B>
    ): Applicative<List<B>> {
        return this.reduce(
            (currentApplyList: Applicative<List<B>>, item: A): Applicative<List<B>> => {
                return fn(item)
                    .ap(
                        currentApplyList
                            .map(
                                function (currentList: List<B>): (processedItem: B) => List<B> {
                                    return (processedItem: B) => currentList.concat(processedItem);
                                }
                            ) as Apply<(a: B) => List<B>>
                    ) as Applicative<List<B>>;
            },
            applicativeTypeRep.of(new List<B>([])) as Applicative<List<B>>,
        ) as Applicative<List<B>>;
    }

    concat(value: A): List<A> {
        return new List(this.value.concat(value));
    }

    get(): Array<A> {
        return this.value;
    }

}
