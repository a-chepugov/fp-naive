import {Functor} from './Functor';

export {Functor} from './Functor';

export interface Apply<A> extends Functor<A> {
    ap<B>(other: ThisType<(value: A) => B>): ThisType<B>
}

export default Apply;
