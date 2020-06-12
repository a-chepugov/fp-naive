import Either from "../../implementations/Either";
import Maybe from "../../implementations/Maybe";

/**
 * @category Transformations
 * @description Natural transformation from Maybe into Either
 * @summary maybeToEither :: Maybe b -> Either a b
 * @param {Maybe} maybe
 * @typeParam L - left Either type
 * @typeParam R - right Either type and Maybe type
 * @returns {Either}
 * @example
 * maybeToEither(Maybe.just(42)); // Either.Right { 42 }
 */
export default function maybeToEither<L, R>(maybe: Maybe<R>, left?: L): Either<L, R> | never {
	switch (true) {
		case maybe.isNothing:
			return Either.left(left);

		case maybe.isJust:
			return Either.right(maybe.get());

		default:
			throw new Error('First argument has to be an Maybe')
	}
};
