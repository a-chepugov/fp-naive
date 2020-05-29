import Applicative from "../../interfaces/Applicative";
import Traversable from "../../interfaces/Traversable";

export default function traverse<A, B>(fn: (a: A) => Applicative<B>, traversable: Traversable<A>): Applicative<Traversable<B>> {
    return traversable.traverse(fn);
}
