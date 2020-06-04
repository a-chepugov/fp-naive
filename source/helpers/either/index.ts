import Either from '../../implementations/Either';

/**
 * @category Helpers
 * @description Chooses function to call basing on third argument type
 * @summary either :: (a -> c, b -> c) -> Either a b -> c
 * @example
 * either((a: number) => a + 1, (a: number) => a + 2)(Either.right(2)); // 4
 */
export default function either<A, B, C>(cbLeft: (a: A) => C, cbRight: (b: B) => C)
    : (e: Either<A, B>) => C {
    return (e: Either<A, B>): C => {
        return e.bimap(cbLeft, cbRight).get();
    }
};
