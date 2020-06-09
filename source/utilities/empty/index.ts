import {Monoid, MonoidTypeRep} from "../../specifications/Monoid";

/**
 * @category Point-free Utilities
 */
export default function empty<A>(aMonoidTypeRep: MonoidTypeRep<A>): Monoid<A> {
    return aMonoidTypeRep.empty();
}
