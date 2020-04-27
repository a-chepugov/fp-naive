export default function tap<A>(interceptor: (a: Readonly<A>) => any) {
    return function (a: A) {
        interceptor.call(this, a);
        return a;
    }
}
