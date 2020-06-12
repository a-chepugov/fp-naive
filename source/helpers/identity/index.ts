/**
 * @category Helpers
 * @description Returns first argument as is
 * @summary identity :: a -> s
 * @param {any} a
 * @returns {function}
 * @example
 * identity(42); // 42
 */
export default function identity<A>(a: A): A {
	return a;
}
