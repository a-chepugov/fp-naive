import {Applicative, ApplicativeTypeRep} from "../../interfaces/Applicative";

/**
 * @category Point-free Utilities
 */
export default function of<A>(anApplicativeTypeRep: ApplicativeTypeRep<A>, value: A): Applicative<A> {
    return anApplicativeTypeRep.of(value);
}
