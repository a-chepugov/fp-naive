import Maybe from "../../implementations/Maybe";

export default function lift<A, B>(fn: (a: A) => B): (a: A) => Maybe<B> {
    return function (value: A): Maybe<B> {
        return Maybe.of(value).map(fn);
    }
}
