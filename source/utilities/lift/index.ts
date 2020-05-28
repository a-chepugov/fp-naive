import Maybe from "../../implementations/Maybe";

export default function lift<A, B>(fn: (a: A) => B): (a: A) => Maybe<B> {
    return function (value: A): Maybe<B> {
        const result = Maybe.of(value) as Maybe<A>;
        return result.map(fn) as Maybe<B>;
    }
}
