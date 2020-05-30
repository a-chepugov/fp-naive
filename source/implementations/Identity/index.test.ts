import {expect} from "chai";

import Testee from "./index";

import FunctorTests from "../../interfaces/Functor/index.tests";
import ApplyTests from "../../interfaces/Apply/index.tests";
import ApplicativeTests from "../../interfaces/Applicative/index.tests";
import ChainTests from "../../interfaces/Chain/index.tests";
import MonadTests from "../../interfaces/Monad/index.tests";
import FoldableTests from "../../interfaces/Foldable/index.tests";
import TraversableTests from "../../interfaces/Traversable/index.tests";


describe("Identity", () => {

    describe("laws", () => {
        FunctorTests(Testee);
        ApplyTests(Testee);
        ApplicativeTests(Testee);
        ChainTests(Testee);
        MonadTests(Testee);
        FoldableTests(Testee);
        TraversableTests(Testee);
    });



    it("get", () => {
        const instance = Testee.of(5);
        expect(instance.get()).to.be.equal(5);
    });

    it("join", () => {
        const instance = Testee.of(Testee.of(3));
        expect(instance.join()).to.be.instanceof(Testee);
        expect(instance.join().get()).to.be.equal(3);
    });

});
