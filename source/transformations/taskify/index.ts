import Task from "../../implementations/Task";

/**
 * @category Transformations
 * @description Transforms `callback last, error first` style function into Task
 * @summary taskify :: function ( a b .. function (e r) ) -> ( a b .. ) -> Task e r
 * @param {function} fn
 * @typeParam L type of Task rejected
 * @typeParam R type of Task resolved
 * @returns {function}
 * @example
 * const readFileTask = taskify(fs.readFile); // (...args) => Task
 * readFileTask('hello.txt')
 */
export default function taskify<L, R>(fn: (...args: any[]) => any): (...args: any[]) => Task<L, R> {
	return function (this: any, ...args: any[]) {
		return new Task<L, R>((reject, resolve) =>
			fn.call(this, ...args, (error: L, result: R) => error ? reject(error) : resolve(result)))
	}
};
