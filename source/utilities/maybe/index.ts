import Maybe from '../../implementations/Maybe';

// maybe :: b -> (a -> b) -> Maybe a -> b
export default function maybe<A, B>(fallbackValue: B, map: (a: A) => B, m: Maybe<A>): B {
    switch (true) {
        case m.isJust:
            return map(m.get());

        case m.isNothing:
            return fallbackValue;

        default:
            throw new Error('Third argument has to be an Maybe')
    }
};
