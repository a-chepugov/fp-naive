import Either from "../../implementations/Either";
import Task from "../../implementations/Task";

/**
 * @category Transformations
 * @description Natural transformation from Either into Task
 * @summary promiseToTask :: Either a b -> Task a b
 * @param {Either} either
 * @typeParam L type of task left callback first argument
 * @typeParam R type of task right callback first argument
 * @returns {Task}
 * @example
 * eitherToTask(Either.right(42)); // Task.Resolved{ 42 }
 */
export default function eitherToTask<L, R>(either: Either<L, R>): Task<L, R> {
	return either.bimap((l: L) => Task.rejected<L, R>(l), (r: R) => Task.resolved<L, R>(r)).get();
};
