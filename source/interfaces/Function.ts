export type FN = (...args: any[]) => any;

export function isFN(object: any): object is FN {
    return typeof (object as FN) === 'function';
}

export type FNA0<O> = () => O;

export function isFNA0<O>(object: any): object is FNA0<O> {
    return typeof (object as FNA0<O>) === 'function';
}

export type FNA1<I, O> = (i: I) => O;

export function isFNA1<I, O>(object: any): object is FNA1<I, O> {
    return typeof (object as FNA1<I, O>) === 'function';
}

export type FNA2<I1, I2, O> = (i1: I1, i2: I2) => O;

export function isFNA2<I1, I2, O>(object: any): object is FNA2<I1, I2, O> {
    return typeof (object as FNA2<I1, I2, O>) === 'function';
}

export type FNA3<I1, I2, I3, O> = (i1: I1, i2: I2, i3: I3) => O;

export function isFNA3<I1, I2, I3, O>(object: any): object is FNA3<I1, I2, I3, O> {
    return typeof (object as FNA3<I1, I2, I3, O>) === 'function';
}

export type FNAN<P extends unknown[], O> = (...args: P) => O;

export function isFNAN<P extends unknown[], O>(object: any): object is FNAN<P, O> {
    return typeof (object as FNAN<P, O>) === 'function';
}

export type ARGS<F extends FN> = Parameters<F>;
export type ARG1<F extends FN> = ARGS<F>[0];
export type ARG2<F extends FN> = ARGS<F>[1];
export type ARG3<F extends FN> = ARGS<F>[2];
export type RETURN<F extends FN> = ReturnType<F>;

export type OR_ARGS<F> = F extends (...args: infer Args) => any? Args : unknown;
export type OR_ARG1<F> = F extends (...args: infer Args) => any? Args[0] : unknown;
export type OR_ARG2<F> = F extends (...args: infer Args) => any? Args[1] : unknown;
export type OR_ARG3<F> = F extends (...args: infer Args) => any? Args[2] : unknown;
export type OR_RETURN<F> = F extends (...args: any[]) => infer Result? Result : unknown;