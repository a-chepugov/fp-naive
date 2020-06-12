import Chain from "../../specifications/Chain";

/**
 * @category Point-free Utilities
 * @summary chain :: (a -> Chain b) -> Chain a -> Chain b
 */
export default function chain<A, B>(fn: (a: A) => Chain<B>): (chain: Chain<A>) => Chain<B> {
	return function (chain: Chain<A>): Chain<B> {
		return chain.chain(fn);
	};
}
