export type FN = (...args: any[]) => any;

export function isFN(object: any): object is FN {
    return typeof (object as FN) === 'function';
}

export type FNA1<I, O> = (i: I) => O;

export function isFNA1<I, O>(object: any): object is FNA1<I, O> {
    return typeof (object as FNA1<I, O>) === 'function';
}

export type ARGS<F> = F extends (...args: any[]) => any ? Parameters<F> : never;
export type ARG1<F> = ARGS<F>[0];
export type RETURNS<F> = F extends (...args: any[]) => any ? ReturnType<F> : never;
