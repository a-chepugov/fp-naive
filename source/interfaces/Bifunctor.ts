export interface Bifunctor<AL, AR> {
    bimap<BL, BR>(fnLeft: (al: AL) => BL, fnRight: (ar: AR) => BR): Bifunctor<BL, BR>
}

export default Bifunctor;
