export interface Bifunctor<AL, AR> {
    // bimap :: Bifunctor f => (a -> b, c -> d) -> f a c-> f b d
    bimap<BL, BR>(fnLeft: (al: AL) => BL, fnRight: (ar: AR) => BR): Bifunctor<BL, BR>
}

export default Bifunctor;
