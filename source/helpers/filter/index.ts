import Filterable from "../../interfaces/Filterable";

// filter :: Filterable f => f a ~> (a -> Boolean) -> f a
export default function filter<A>(filtrator: (a: A) => Boolean, filterable: Filterable<A>): Filterable<A> {
    return filterable.filter(filtrator);
}
