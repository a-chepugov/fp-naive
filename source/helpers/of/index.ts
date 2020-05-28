import Applicative from "../../interfaces/Applicative";

export default function of<A>(applicativeTypeRep: { of: (a: A) => Applicative<A> }, value: A): Applicative<A> {
    return applicativeTypeRep.of(value);
}
