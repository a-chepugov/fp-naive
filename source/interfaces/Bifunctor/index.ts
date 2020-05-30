export interface Bifunctor<AL, AR> {
    // bimap :: Bifunctor f => f a c ~> (a -> b, c -> d) -> f b d
    bimap<BL, BR>(fnLeft: (al: AL) => BL, fnRight: (ar: AR) => BR): Bifunctor<BL, BR>
}

export default Bifunctor;
