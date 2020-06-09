import Semigroup from "../../specifications/Semigroup";

/**
 * @category Point-free Utilities
 * @summary concat :: Semigroup a -> Semigroup a -> Semigroup b
 */
export default function concat<A>(a: Semigroup<A>): (b: Semigroup<A>) => Semigroup<A> {
    return function (b: Semigroup<A>): Semigroup<A> {
        return a.concat(b);
    };
}
