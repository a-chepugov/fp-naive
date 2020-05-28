import {Apply, Applicative} from "../../interfaces/Applicative";
import Filterable from "../../interfaces/Filterable";
import Foldable from "../../interfaces/Foldable";

export default class List<A> implements Applicative<A>, Filterable<A>, Foldable<A> {
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
        // @ts-ignore
        return this.value.reduce(reducer, initial);
    }

    get(): Array<A> {
        return this.value;
    }

}
