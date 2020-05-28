import Filterable from "../../interfaces/Filterable";

export default function filter<A>(filtrator: (a: A) => Boolean, filterable: Filterable<A>): Filterable<A> {
    return filterable.filter(filtrator);
}
