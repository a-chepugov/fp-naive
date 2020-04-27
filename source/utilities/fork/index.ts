/**
 * @return {function}
 * @example
 * const add = (a: number, b: number) => a + b;
 * const mul2 = (a: number) => a * 2;
 * const mul3 = (a: number) => a * 3;
 * const run = fork(add, mul2, mul3);
 * run(2); // 10;
 */
export default function fork(
    join: (...values: Array<any>) => any,
    ...fns: Array<(...args: Array<any>) => any>
):
    (...args: Array<any>) => any {
    return function run(...args: Array<any>) {
        return join.apply(this, fns.map((fn) => fn.apply(this, args)));
    }
};
