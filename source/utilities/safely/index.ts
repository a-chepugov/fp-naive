import Either from '../../implementations/Either';

type SafeResult<F extends (...args: any[]) => any> = Either<Error, ReturnType<F>>;

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
    : (...args: any[]) => SafeResult<typeof fn> {
    return function (...args: any[]): SafeResult<typeof fn> {
        try {
            return Either.right(fn.apply(this, args));
        } catch (error) {
            return Either.left(error);
        }
    }
};
