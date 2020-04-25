import curry from "../../utilities/curry";
import Chain from "../../interfaces/Chain";

// chain :: Chain m => (a -> m b) -> m a -> m b
export function chain<A, B>(fn: (a: A) => Chain<B>, chain: Chain<A>): Chain<B> {
    return chain.chain<B>(fn);
}

export default curry(chain);
