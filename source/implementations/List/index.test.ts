import {expect} from "chai";

import identity from "../../utilities/identity";

import Testee from "./index";
import Identity from "../Identity";
import Either from "../Either";

import FunctorTests from "../../interfaces/Functor/index.tests";

describe("List", () => {

    FunctorTests(Testee)

    describe("Apply", () => {

        it("ap invokes on List", () => {
            const instance = new Identity(3);
            const inc = (a: number) => ++a;
            const dec = (a: number) => --a;
            const instanceOps = new Testee([inc, dec]);
            const resultMonad = instanceOps.ap(instance) as Identity<number>;
            expect(resultMonad).to.be.instanceof(Identity);
            expect(resultMonad.get()).to.be.deep.equal(4);
        });

    });

    describe("Applicative", () => {

        it("of returns List", () => {
            const instance = Testee.of(1);
            expect(instance).to.be.instanceof(Testee);
        });

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

        it("distributivity", () => {
            const v = Testee.of(5);
            const p = (value: number) => Boolean(value);
            const q = (value: number) => value > 3;

            const result1 = v.filter(x => p(x) && q(x));
            const result2 = v.filter(p).filter(q);

            expect(result1.get()).to.be.deep.equal(result2.get());
        });

        it("identity", () => {
            const v = Testee.of(5);
            const p = (_: number) => true;

            const result1 = v.filter(p);

            expect(result1.get()).to.be.deep.equal(v.get());
        });

        it("annihilation", () => {
            const v = Testee.of(5);
            const p = (_: number) => false;

            const result1 = v.filter(p);

            expect(result1.get()).to.be.deep.equal([]);
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

    describe("Semigroup", () => {

        it("concat returns same type", () => {
            const instance1 = Testee.of(1);
            const instance2 = Testee.of(2);
            expect(instance1.concat(instance2)).to.be.instanceof(Testee);
        });

        it("associativity", () => {
            const a = Testee.of(1);
            const b = Testee.of(2);
            const c = Testee.of(3);

            const r1 = a.concat(b).concat(c);
            const r2 = a.concat(b.concat(c));
            expect(r1).to.be.deep.equal(r2);
        });

    });

    it("get", () => {
        const instance = Testee.of(5);
        expect(instance.get()).to.be.deep.equal([5]);
    });

});
