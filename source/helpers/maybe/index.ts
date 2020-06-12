import Maybe from '../../implementations/Maybe';

/**
 * @category Helpers
 * @description Takes default type A value, transform function (A to B). Then takes Maybe<A> and transform it into type B value
 * @summary maybe :: (b, a -> b) -> (Maybe a) -> b
 * @param {any} defaultValue
 * @param {function} fn
 */
export default function maybe<A, B>(defaultValue: B, fn: (a: A) => B): (m: Maybe<A>) => B {
	return function (m: Maybe<A>): B {
		switch (true) {
			case m.isJust:
				return m.map(fn).get();

			case m.isNothing:
				return defaultValue;

			default:
				throw new Error('Third argument has to be an Maybe')
		}
	}
}
