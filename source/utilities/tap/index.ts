import curry from "../curry";

export function tap<A>(interceptor: (a: Readonly<A>) => any, a: A) {
    interceptor(a);
    return a;
}

export default curry(tap);
