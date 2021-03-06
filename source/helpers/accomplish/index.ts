/**
 * @category Helpers
 * @description If the first passed argument is a function,
 * it is executed passing other argument to it and result of its execution is returned,
 * otherwise first argument will be returned as is
 * @summary accomplish :: a | (b -> a) -> a
 * @param {any} a
 * @param {...any} args
 * @returns {any}
 * @example
 * accomplish((a: number, b: number) => a + b, 2, 3); // 5
 */
export default function accomplish(a: any, ...args: any[]): any {
	if (typeof a === 'function') {
		return a.apply(this, args);
	} else {
		return a;
	}
};
