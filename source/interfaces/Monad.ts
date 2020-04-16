import {Applicative} from './Applicative';

export {Applicative} from './Applicative';

import {Chain, Apply, Functor} from "./Chain";

export {Chain, Apply, Functor} from "./Chain";

export interface Monad<A> extends Chain<A>, Applicative<A> {
}

export default Monad
