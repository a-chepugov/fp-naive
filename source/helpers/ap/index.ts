import Apply from "../../interfaces/Apply";

export default function ap<A, B>(apply: Apply<A>, applyFn: Apply<(a: A) => B>): Apply<B> {
    return applyFn.ap(apply);
}
