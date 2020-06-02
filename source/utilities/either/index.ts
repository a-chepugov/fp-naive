import Either from '../../implementations/Either';

/**
 * Choose function to call basing on third argument type
 * @example
 * either((a: number) => a + 1, (a: number) => a + 2)(Either.right(2)); // 4
 */
// either :: (a -> c, b -> c) -> Either a b -> c
export default function either<A, B, C>(cbLeft: (a: A) => C, cbRight: (b: B) => C)
    : (e: Either<A, B>) => C {
    return (e: Either<A, B>): C => {
        switch (true) {
            case e.isLeft:
                return cbLeft(e.get() as A);

            case e.isRight:
                return cbRight(e.get() as B);

            default:
                throw new Error('Third argument has to be an Either')
        }
    }
};
