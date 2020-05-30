import {expect} from "chai";

import Testee from "./index";

import FunctorTests from "../../interfaces/Functor/index.tests";
import ApplyTests from "../../interfaces/Apply/index.tests";
import ApplicativeTests from "../../interfaces/Applicative/index.tests";
import FoldableTests from "../../interfaces/Foldable/index.tests";
import TraversableTests from "../../interfaces/Traversable/index.tests";
import FilterableTests from "../../interfaces/Filterable/index.tests";
import SemigroupTests from "../../interfaces/Semigroup/index.tests";

describe("List", () => {

    describe("laws", () => {
        FunctorTests(Testee);
        ApplyTests(Testee);
        ApplicativeTests(Testee);
        FilterableTests(Testee);
        FoldableTests(Testee);
        TraversableTests(Testee);
        FilterableTests(Testee);
        SemigroupTests(Testee);
    });

    describe("Filterable", () => {

        it("filter on List([1]) gives List(1)", () => {
            const instance = Testee.of(1);
            const filtrator = (value: number): Boolean => Boolean(value);

            const result = instance.filter(filtrator);
            expect(result.get()).to.be.deep.equal([1]);
        });

        it("filter on List([0, 1, 2]) gives List([1, 2])", () => {
            const instance = new Testee([0, 1, 2]);
            const filtrator = (value: number): Boolean => Boolean(value);

            const result = instance.filter(filtrator);
            expect(result.get()).to.be.deep.equal([1, 2]);
        });

    });

    it("get", () => {
        const instance = Testee.of(5);
        expect(instance.get()).to.be.deep.equal([5]);
    });

});
