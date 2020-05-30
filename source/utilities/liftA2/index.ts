import Apply from "../../interfaces/Apply";

/**
 * lifts Apply to function-containing Apply
 * @param {function} fn
 * @return {function}
 * @example
 * const sum = (a: number) => (b: number) => a + b;
 * const instance1 = Identity.of(1);
 * const instance2 = Identity.of(2);
 * liftA2(sum)(instance1)(instance2) // Identity<3>;
 */
export default function liftA2(fn: (v1: any) => (v2: any) => any): (a1: Apply<any>) => (a2: Apply<any>) => Apply<any> {
    return function (a1: Apply<any>): (a2: Apply<any>) => Apply<any> {
        return function (a2: Apply<any>): Apply<any> {
            return a1.map(fn).ap(a2);
        }
    }
}
