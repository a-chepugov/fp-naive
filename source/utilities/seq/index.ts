/**
 * @return {function}
 * @example
 * const add2 = (a: number) => a + 2;
 * const add3 = (a: number) => a + 3;
 * const run = seq(add2, add3);
 * run(4)); // [6, 7]
 */
export default function seq<A>(...fns: Array<(...args: Array<any>) => any>):
    (...args: Array<any>) => Array<any> {
    return function run(...args: Array<any>) {
        return fns.map((fn) => fn.apply(this, args));
    }
};
