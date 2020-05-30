/**
 * If the first passed argument is a function,
 * it is executed passing other argument to it and result of its execution is returned,
 * otherwise first argument returns it as is
 * @param {any} a
 * @return {any}
 * @example
 * const result = accomplish((a: number, b: number) => a + b, 2, 3);
 * expect(result).to.equal(5);
 */
export default function accomplish(a: any, ...args: any[]): any {
    if (typeof a === 'function') {
        return a.apply(this, args);
    } else {
        return a;
    }
};
