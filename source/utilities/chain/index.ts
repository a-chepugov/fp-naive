import Chain from "../../interfaces/Chain";

/**
 * @category Point-free Utilities
 */
export default function chain<A, B>(fn: (a: A) => Chain<B>, chain: Chain<A>): Chain<B> {
    return chain.chain(fn);
}
