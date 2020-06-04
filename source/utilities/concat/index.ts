import Semigroup from "../../interfaces/Semigroup";

/**
 * @category Point-free Utilities
 */
export default function concat<A>(a: Semigroup<A>, b: Semigroup<A>): Semigroup<A> {
    return a.concat(b);
}
