import Identity from "../../implementations/Identity";
import Maybe from "../../implementations/Maybe";

/**
 * @category Transformations
 * @description Natural transformation from Identity into Maybe
 * @summary identityToMaybe :: Identity b -> Maybe a
 * @param {Identity} identity
 * @typeParam A - Maybe and Identity type
 * @returns {Maybe}
 * @example
 * identityToMaybe(Identity.of(42)); // Maybe.Just { 42 }
 */
export default function identityToMaybe<A>(identity: Identity<A>): Maybe<A> {
	return Maybe.fromNullable(identity.get());
};
