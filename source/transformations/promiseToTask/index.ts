import Task from "../../implementations/Task";

/**
 * @category Transformations
 * @description Transforms Promise into Task
 * @summary promiseToTask :: Promise a b -> Task b a
 * @param {Promise} promise
 * @typeParam L type of task left callback first argument
 * @typeParam R type of task right callback first argument
 * @returns {Task}
 * @example
 * promiseToTask(Promise.resolve(42)); // Task.Resolved{ 42 }
 */
export default function promiseToTask<L, R>(promise: Promise<R>): Task<L, R> {
	return new Task<L, R>(function (reject, resolve) {
		promise.then(resolve, reject);
		return this;
	}).fork((l: L) => l, (r: R) => r);
};
