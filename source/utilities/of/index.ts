import {Applicative, ApplicativeTypeRep} from "../../specifications/Applicative";

/**
 * @category Point-free Utilities
 * @summary of :: TypeRep Applicative -> a -> Applicative a
 */
export default function of<A>(anApplicativeTypeRep: ApplicativeTypeRep<A>) {
    return function (value: A): Applicative<A> {
        return anApplicativeTypeRep.of(value);
    };
}
