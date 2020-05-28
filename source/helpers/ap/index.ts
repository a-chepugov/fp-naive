import Apply from "../../interfaces/Apply";

// ap :: Apply f => f (a -> b) -> f a-> f b
export default function ap<A, B>(applyFn: Apply<(a: A) => B>, apply: Apply<A>): Apply<B> {
    return apply.ap<B>(applyFn);
}
