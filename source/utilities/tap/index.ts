/**
 * Calls any interceptor function on data. without modifications of passed data
 * It's used for debug purposes
 * @example
 * logTap = tap(console.log);
 * logTap(123); // `123` in STDOUT
 */
export default function tap<A>(interceptor: (a: Readonly<A>) => any) {
    return function (a: A) {
        interceptor.call(this, a);
        return a;
    }
}
