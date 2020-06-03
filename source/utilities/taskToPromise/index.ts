import Task from "../../implementations/Task";

/**
 * Convert Task into Promise
 * @return {Promise}
 * @example
 * const task = Task.resolved(42);
 * TaskToPromise(task); // Promise { <resolved>: 42 }
 */
// TaskToPromise :: Task a b -> Promise b
export default function taskToPromise<L, R>(task: Task<L, R>) {
    return new Promise<R>((resolve, reject) => {
        task.fork(reject, resolve)
    });
};
