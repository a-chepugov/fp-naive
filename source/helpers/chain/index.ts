import Chain from "../../interfaces/Chain";

export default function chain<A, B>(fn: (a: A) => Chain<B>, chain: Chain<A>): Chain<B> {
    return chain.chain<B>(fn);
}
