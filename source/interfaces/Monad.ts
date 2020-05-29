import {Applicative} from './Applicative';

export {Functor, Apply, ARG1, RETURNS, isFN, Applicative} from './Applicative';

import {Chain} from "./Chain";

export {Chain} from "./Chain";

export interface Monad<A> extends Applicative<A>, Chain<A> {
    map<B>(fn: (a: A) => B): Monad<B>
}

export default Monad
