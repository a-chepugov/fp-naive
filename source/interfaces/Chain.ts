import {Apply, Functor} from './Apply';

export {Apply, Functor} from './Apply';

export interface Chain<A> extends Apply<A> {
    // chain :: Chain m => m a ~> (a -> m b) -> m b
    chain<B>(fn: (value: A) => Chain<B>): Chain<B>
}

export default Chain;
