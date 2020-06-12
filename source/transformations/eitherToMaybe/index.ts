import Either from "../../implementations/Either";
import Maybe from "../../implementations/Maybe";

/**
 * @category Transformations
 * @description Natural transformation from Either into Maybe
 * @summary eitherToMaybe :: Either a b -> Maybe b
 * @param {Either} either
 * @typeParam L - left Either type
 * @typeParam R - right Either type and Maybe type
 * @returns {Maybe}
 * @example
 * eitherToMaybe(Either.right(42)); // Maybe.Just { 42 }
 */
export default function eitherToMaybe<L, R>(either: Either<L, R>): Maybe<R> | never {
	switch (true) {
		case either.isLeft:
			return Maybe.nothing<R>();

		case either.isRight:
			return Maybe.just(either.get() as R);

		default:
			throw new Error('First argument has to be an Either')
	}
};
