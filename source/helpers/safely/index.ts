import Either from '../../implementations/Either';

/**
 * @category Helpers
 * @description Allows to call a function safely. And resolve it into Either
 * @summary safely :: [(a -> b)] -> a -> Either Error b
 * @param {function} fn - function to call
 * @example
 * const fn = (a: any) => {
 *     throw new Error('oops');
 * };
 * safely(fn)(1); // Either.Left(Error('oops'))
 */
export default function safely(fn: (...args: any[]) => any)
	: (...args: Parameters<typeof fn>) => Either<Error, ReturnType<typeof fn>> {
	return function (...args: Parameters<typeof fn>): Either<Error, ReturnType<typeof fn>> {
		try {
			return Either.right(fn.apply(this, args));
		} catch (error) {
			return Either.left(error);
		}
	}
};
