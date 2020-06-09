import Applicative, {ApplicativeTypeRep} from "../../specifications/Applicative";
import Traversable from "../../specifications/Traversable";

/**
 * @category Point-free Utilities
 */
export default function traverse<A, B>(TypeRep: ApplicativeTypeRep<Traversable<B>>, fn: (a: A) => Applicative<B>, traversable: Traversable<A>): Applicative<Traversable<B>> {
    return traversable.traverse(TypeRep, fn);
}
