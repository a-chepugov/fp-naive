/**
 * @category Helpers
 * @description Creates function that allows to pass arguments into series of functions and to receive an array of that function result
 * @summary seq :: [(a -> *)] -> a -> [*]
 * @param {...function} fns
 * @typeParam Args arguments than will be passed into functions
 * @returns`{function}
 * @example
 * let add1 = (a: number) => a + 1;
 * let add2 = (a: number) => a + 2;
 * let run = seq(add2, add3);
 * run(4)); // [5, 6]
 */
export default function seq<Args extends any[], F extends (...args: Args) => any>(...fns: F[]): (...args: Args) => any[] {
    return function run(...args: Args): any[] {
        return fns.map((fn) => fn.apply(this, args));
    }
};
