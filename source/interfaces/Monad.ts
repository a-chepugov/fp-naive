import * as Applicative from './Applicative';

export * as Applicative from './Applicative';

import * as Chain from "./Chain";

export * as Chain from "./Chain";

export interface Monad<A> extends Applicative.default<A>, Chain.default<A> {
    map<B>(fn: (a: A) => B): Monad<B>
}

export default Monad
