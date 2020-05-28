import Either from '../../implementations/Either';

// either :: (a -> c) -> (b -> c) -> Either a b -> c
export default function either<A, B, C>(cbLeft: (a: A) => C, cbRight: (b: B) => C, e: Either<A, B>): C {
    switch (true) {
        case e.isLeft:
            return cbLeft(e.get() as A);

        case e.isRight:
            return cbRight(e.get() as B);

        default:
            throw new Error('Third argument has to be an Either')
    }
};
