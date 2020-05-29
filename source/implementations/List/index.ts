import {Apply, ARG1, isFN, RETURNS, Applicative} from "../../interfaces/Applicative";
import {Filterable} from "../../interfaces/Filterable";
import {Traversable} from "../../interfaces/Traversable";

export default class List<A> implements Applicative<A>, Filterable<A>, Traversable<A> {
    protected readonly values: Array<A>;

    constructor(value: Array<A>) {
        this.values = value;
    }

    static of<A>(value: A): List<A> {
        return new List<A>([value]);
    }

    map<B>(fn: (value: A) => B): List<B> {
        return new List(this.values.map(fn));
    }

    ap(other: Apply<ARG1<A>>): Apply<RETURNS<A>> {
        type INPUT = ARG1<A>;
        type OUTPUT = RETURNS<A>;
        const fn = this.values[0];
        if (isFN<INPUT, OUTPUT>(fn)) {
            return other.map<OUTPUT>(fn) as Apply<OUTPUT>;
        } else {
            throw new Error('this.value is not a function: ' + this.inspect())
        }
    }

    filter(fn: (value: A) => Boolean): List<A> {
        return new List(this.values.filter(fn));
    }

    reduce<B>(reducer: (accumulator: B, value: A) => B, initial?: B): B {
        return this.values.reduce(reducer, initial);
    }

    traverse<B>(
        applicativeTypeRep: { of: (value: B) => Applicative<B> },
        fn: (a: A) => Applicative<B>
    ): Applicative<List<B>> {
        return this.values.reduce(
            (acc: Applicative<List<B>> | null, item: A) => {
                const appitem = fn(item);

                return acc ?
                    (appitem
                        .map((item) => (acc: any) => acc.concat(item)) as Applicative<(acc: List<B>) => List<B>>)
                        .ap(acc) :

                    appitem.map((item) => List.of(item))
            },
            null
        ) as Applicative<List<B>>;

    }

    concat(value: A): List<A> {
        return new List(this.values.concat(value));
    }

    get(): Array<A> {
        return this.values;
    }

    inspect() {
        // @ts-ignore
        return `List(${this.values.map((item) => item && typeof item.inspect === 'function' ? item.inspect() : `${item}`)})`
    }
}
