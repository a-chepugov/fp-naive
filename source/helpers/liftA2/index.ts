import Apply from "../../specifications/Apply";

/**
 * @category Helpers
 * @description lifts Apply to function-containing Apply
 * @summary liftA2 :: (Applicative f) => (a1 -> a2 -> b) -> f a1 -> f a2 -> f b
 * @param {function} fn
 * @returns {function}
 * @example
 * let sum = (a: number) => (b: number) => a + b;
 * liftA2(sum)(Identity.of(1))(Identity.of(2)) // Identity<3>;
 */
export default function liftA2<A1, A2, B>(fn: (a1: A1) => (a2: A2) => B): (fa1: Apply<A1>) => (fa2: Apply<A2>) => Apply<B> {
    return function (fa1: Apply<A1>): (fa2: Apply<A2>) => Apply<B> {
        return function (fa2: Apply<A2>): Apply<B> {
            return fa1.map(fn).ap(fa2);
        }
    }
}
