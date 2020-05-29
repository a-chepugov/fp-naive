import {Apply} from './Apply';

export {Apply, ARG1, RETURNS, isFN, Functor} from './Apply';

export interface Chain<A> extends Apply<A> {
    map<B>(fn: (a: A) => B): Chain<B>
    // chain :: Chain m => m a ~> (a -> m b) -> m b
    chain<B>(fn: (value: A) => Chain<B>): Chain<B>
}

export default Chain;
