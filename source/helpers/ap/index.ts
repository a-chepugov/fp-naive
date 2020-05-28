import Apply from "../../interfaces/Apply";

export default function ap<A, B>(applyFn: Apply<(a: A) => B>, apply: Apply<A>): Apply<B> {
    return apply.ap<B>(applyFn);
}
