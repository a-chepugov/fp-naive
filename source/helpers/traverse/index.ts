import Applicative, {ApplicativeTypeRep} from "../../interfaces/Applicative";
import Traversable from "../../interfaces/Traversable";

export default function traverse<A, B>(TypeRep: ApplicativeTypeRep<Traversable<B>>, fn: (a: A) => Applicative<B>, traversable: Traversable<A>): Applicative<Traversable<B>> {
    return traversable.traverse(TypeRep, fn);
}
