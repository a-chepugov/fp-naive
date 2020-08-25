import Either from "../../implementations/Either";

/**
 * @category Transformations
 * @description Transforms Either into Promise
 * @summary eitherToPromise :: Either a b -> Promise b
 * @param {Either} either
 * @typeParam L type of promise rejected
 * @typeParam R type of promise resolved
 * @returns {Promise}
 * @example
 * eitherToPromise(Either.right(42)); // Promise.resolved { 42 }
 */
export default function eitherToPromise<L, R>(either: Either<L, R>): Promise<R> {
	return either.bimap((l: L) => Promise.reject(l), (r: R) => Promise.resolve(r)).get();
};
