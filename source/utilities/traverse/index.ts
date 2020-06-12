import Applicative, {ApplicativeTypeRep} from "../../specifications/Applicative";
import Traversable from "../../specifications/Traversable";

/**
 * @category Point-free Utilities
 * @summary of :: (TypeRep Applicative, a -> Applicative b) -> Traversable a -> Applicative (Traversable b)
 */
export default function traverse<A, B>(TypeRep: ApplicativeTypeRep<Traversable<B>>, fn: (a: A) => Applicative<B>): (traversable: Traversable<A>) => Applicative<Traversable<B>> {
	return function (traversable: Traversable<A>): Applicative<Traversable<B>> {
		return traversable.traverse(TypeRep, fn);
	};
}
