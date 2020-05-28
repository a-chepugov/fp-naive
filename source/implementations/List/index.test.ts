import {expect} from "chai";

import identity from "../../utilities/identity";

import Testee from "./index";
import Maybe from "../Maybe";

describe("List", () => {

    describe("Functor", () => {

        it("map invokes on List", () => {
            const instance = Testee.of(5);
            let mapped = instance.map((value: number) => ++value);
            expect(mapped).to.be.instanceof(Testee);
            expect(mapped.get()).to.be.deep.equal([6]);
        });

        it("identity", () => {
            const value = Math.floor(Math.random() * 100);
            const instance = Testee.of(value);
            const result = instance.map(identity) as Testee<number>;
            expect(result.get()).to.be.deep.equal([value]);
        });

        it("composition", () => {
            const value = Math.floor(Math.random() * 100);
            const addition = Math.floor(Math.random() * 100);
            const multiplier = Math.floor(Math.random() * 100);

            const add = (a: number) => a + addition;
            const mul = (a: number) => a + multiplier;

            const instance = Testee.of(value);

            const r1 = instance.map((a: number) => mul(add(a))) as Testee<number>;
            const r2 = instance.map(add).map(mul) as Testee<number>;

            expect(r1.get()).to.be.deep.equal(r2.get());
        });

    });

    describe("Apply", () => {

        it("ap invokes on List", () => {
            const instance = new Testee([1, 2, 3]);
            const inc = (a: number) => ++a;
            const instanceAdd = Maybe.of(inc);
            const resultMonad = instance.ap(instanceAdd);

            expect(resultMonad).to.be.instanceof(Testee);
            expect(resultMonad.get()).to.be.deep.equal([2, 3, 4]);
        });

        it("composition", () => {
            const value = Math.floor(Math.random() * 100);
            const addition = Math.floor(Math.random() * 100);
            const multiplier = Math.floor(Math.random() * 100);

            const add = (a: number) => a + addition;
            const mul = (a: number) => a + multiplier;

            const vT = Testee.of(value);
            const aT = Testee.of(add);
            const mT = Testee.of(mul);

            const transform =
                (f: (a: number) => number) =>
                    (g: (a: number) => number) =>
                        (x: number) =>
                            f(g(x));

            const r1 = vT.ap(aT.ap(mT.map(transform))) as Testee<number>;
            const r2 = vT.ap(mT).ap(aT) as Testee<number>;

            expect(r1.get()).to.be.deep.equal(r2.get());
        });

    });

    describe("Applicative", () => {

        it("of returns List", () => {
            const instance = Testee.of(1);
            expect(instance).to.be.instanceof(Testee);
        });

    });

    describe("Filterable", () => {

        it("filter on List([1]) gives Maybe.Just(1)", () => {
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

    it("get", () => {
        const instance = Testee.of(5);
        expect(instance.get()).to.be.deep.equal([5]);
    });

});
