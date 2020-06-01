import * as Apply from '../Apply';

export * as Apply from '../Apply';

export interface Chain<A> extends Apply.default<A> {
    // chain :: Chain m => m a ~> (a -> m b) -> m b
    chain<B>(fn: (value: A) => Chain<B>): Chain<B>
}

export default Chain;
