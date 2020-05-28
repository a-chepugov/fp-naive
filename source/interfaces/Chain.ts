import {Apply, Functor} from './Apply';

export {Apply, Functor} from './Apply';

export interface Chain<A> extends Apply<A> {
    // chain :: Chain m => (a -> m b) -> m a -> m b
    chain<B>(fn: (value: A) => Chain<B>): Chain<B>
}

export default Chain;
