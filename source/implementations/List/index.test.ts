import {expect} from "chai";

import Testee from "./index";
import Either from "../Either";

import FunctorTests from "../../interfaces/Functor/index.tests";
import ApplyTests from "../../interfaces/Apply/index.tests";
import ApplicativeTests from "../../interfaces/Applicative/index.tests";
import FilterableTests from "../../interfaces/Filterable/index.tests";
import SemigroupTests from "../../interfaces/Semigroup/index.tests";

describe("List", () => {

    describe("laws", () => {
        FunctorTests(Testee);
        ApplyTests(Testee);
        ApplicativeTests(Testee);
        FilterableTests(Testee);
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

    describe("Foldable", () => {

        it("reduce on List([1, 2, 3]) with initial 1 gives 7", () => {
            const instance = new Testee([1, 2, 3]);
            const reducer = (accumulator: number, value: number) => accumulator + value;

            const result = instance.reduce(reducer, 1);
            expect(result).to.be.equal(7);
        });

    });

    describe("Traversable", () => {

        it("traverse List<number> to Either<List<number>>", () => {
            const instance = new Testee([1, 2, 3]);
            const toEitherNumber = (a: number) => a > 0 ? Either.right(a) : Either.left(new Error(`${a} is not greater than 0`));
            const result = instance.traverse(toEitherNumber) as Either<number, Testee<number>>;
            expect(result).to.be.instanceof(Either);
            expect(result.get()).to.be.instanceof(Testee);
            expect(result.getOrElse(Testee.of(1)).get()).to.be.deep.equal([1, 2, 3]);
        });

    });

    it("get", () => {
        const instance = Testee.of(5);
        expect(instance.get()).to.be.deep.equal([5]);
    });

});
