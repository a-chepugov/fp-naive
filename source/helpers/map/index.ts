import curry from "../curry";

type FN<A, B> = (value: A) => B

export function map<A, B, C>(fn: FN<A, B>, target: { map: (value: FN<A, B>) => C }): C {
    return target.map(fn);
}

export default curry(map);
