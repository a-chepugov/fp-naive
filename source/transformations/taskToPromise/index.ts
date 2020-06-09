import Task from "../../implementations/Task";

/**
 * @category Transformations
 * @description Transforms Task into Promise
 * @summary taskToPromise :: Task a b -> Promise b a
 * @param {Task} task
 * @typeParam L type of task left callback first argument
 * @typeParam R type of task right callback first argument
 * @returns {Promise}
 * @example
 * TaskToPromise(Task.resolved(42)); // Promise { 42 }
 */
export default function taskToPromise<L, R>(task: Task<L, R>) {
    return new Promise<R>((resolve, reject) => {
        task.fork(reject, resolve)
    });
};
