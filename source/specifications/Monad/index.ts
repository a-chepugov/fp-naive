import Applicative from '../Applicative';

export * as Applicative from '../Applicative';

import Chain from "../Chain";

export * as Chain from "../Chain";
/** @ignore */
export interface Monad<A> extends Applicative<A>, Chain<A> {
    map<B>(fn: (a: A) => B): Monad<B>;
}

export default Monad
