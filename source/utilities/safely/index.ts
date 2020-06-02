import Either from '../../implementations/Either';

/**
 * safely calls a function
 * @param {function} fn
 * @return {Either}
 * @example
 * const fn = () => {
 *     throw new Error('ooops');
 * };
 * const result = safely(fn)();
 * expect(result.isLeft).to.be.true;
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
