import Task from "../../implementations/Task";

/**
 * Convert Promise into Task
 * @param {Promise} promise
 * @return {Task}
 * @example
 * const task = Task.resolved(42);
 * TaskToPromise(task); // Promise { <resolved>: 42 }
 */
// TaskToPromise :: Promise b -> Task a b
export default function promiseToTask<L, R>(promise: Promise<R>): Task<L, R> {
    return new Task<L, R>(function (reject, resolve) {
        promise.then(resolve, reject);
        return this;
    }).fork((l: L) => l, (r: R) => r);
};
