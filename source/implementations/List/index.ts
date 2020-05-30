import Filterable from "../../interfaces/Filterable";
import Traversable from "../../interfaces/Traversable";
import Semigroup from "../../interfaces/Semigroup";

import * as MonadModule from "../../interfaces/Monad";

type Applicative<A> = MonadModule.Applicative.Applicative<A>;
type ApplicativeTypeRep<A> = MonadModule.Applicative.ApplicativeTypeRep<A>;
type Apply<A> = MonadModule.Chain.Apply.Apply<A>;
type ARG1<A> = MonadModule.Chain.Apply.ARG1<A>;
type RETURNS<A> = MonadModule.Chain.Apply.RETURNS<A>;
const isFN = MonadModule.Chain.Apply.isFN;

export default class List<A> implements Applicative<A>, Filterable<A>, Traversable<A>, Semigroup<A> {
    protected readonly values: Array<A>;

    constructor(values: Array<A>) {
        this.values = values;
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

    get(): Array<A> {
        return this.values;
    }

    inspect() {
        // @ts-ignore
        return `List(${this.values.map((item) => item && typeof item.inspect === 'function' ? item.inspect() : `${item}`)})`
    }
}
