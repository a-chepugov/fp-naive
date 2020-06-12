import Identity from "../../implementations/Identity";
import Maybe from "../../implementations/Maybe";

/**
 * @category Transformations
 * @description Natural transformation from Maybe into Identity
 * @summary maybeToIdentity :: Maybe a -> Identity a
 * @param {Maybe} maybe
 * @typeParam A - Maybe and Identity type
 * @returns {Identity}
 * @example
 * maybeToIdentity(Maybe.just(42)); // Identity { 42 }
 */
export default function maybeToIdentity<A>(maybe: Maybe<A>): Identity<A> | never {
	return Identity.of(maybe.getOrElse(undefined));
};
