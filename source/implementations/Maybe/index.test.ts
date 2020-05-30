import {expect} from "chai";

import identity from "../../utilities/identity";

import Testee from "./index";
import FunctorTests from "../../interfaces/Functor/index.tests";

describe("Maybe", () => {

    FunctorTests(Testee);

    describe("Maybe prototype", () => {

        describe("Applicative", () => {

            it("of returns Maybe", () => {
                const instance = Testee.of(1);
                expect(instance).to.be.instanceof(Testee);
            });

        });

        it("just returns Maybe.Just", () => {
            const instance = Testee.of(5);
            expect(instance.isJust).to.be.true;
        });

        it("nothing returns Maybe.Nothing", () => {
            const instance = Testee.nothing();
            expect(instance.isNothing).to.be.true;
        });

        it("fromNullable for non nulls return Maybe.Just", () => {
            const instance = Testee.fromNullable(1);
            expect(instance.isJust).to.be.true;
        });

        it("fromNullable for null return Maybe.Nothing", () => {
            const instance = Testee.fromNullable(null);
            expect(instance.isNothing).to.be.true;
        });

    });

    describe("Nothing", () => {

        describe("Functor", () => {

            it("skips map function", () => {
                const maybe = Testee.nothing();
                let counter = 0;
                let mapped = maybe.map((value: number) => counter++);
                expect(mapped).to.be.instanceof(Testee);
                expect(counter).to.be.equal(0);
            });

        });

        describe("Apply", () => {

            it("ap skips on Maybe.Nothing", () => {
                const instance = Testee.nothing<number>();
                let counter = 0;
                const add = (a: number) => counter++;
                const instanceAdd = Testee.of(add);
                const resultMonad = instanceAdd.ap(instance);
                expect(resultMonad).to.be.instanceof(Testee);
                expect(counter).to.be.equal(0);
            });

        });

        describe("Chain", () => {

            it("chain skips on Maybe.Nothing", () => {
                const instance = Testee.nothing();
                let counter = 0;
                const fn = (value: number): Testee<number> => Testee.of(++counter)
                let chained = instance.chain(fn);
                expect(chained).to.be.instanceof(Testee);
                expect(counter).to.be.equal(0);
            });

        });

        describe("Filterable", () => {

            it("filter on Maybe.Nothing gives Maybe.Nothing", () => {
                const instance = Testee.nothing(1);
                const filtrator = (value: number) => Boolean(value);

                const result = instance.filter(filtrator);
                expect(result.isNothing).to.be.true;
            });

        });

        it("get throws on Maybe.Nothing", () => {
            const instance = Testee.nothing();
            expect(() => instance.get()).to.throw();
        });

        it("join", () => {
            const instance = Testee.nothing();
            expect(instance.join().isNothing).to.be.true;
        });

        it("getOrElse", () => {
            const instance = Testee.nothing();
            let getOrElse = instance.getOrElse(1);
            expect(getOrElse).to.be.equal(1);
        });

        it("getOrElseRun", () => {
            const instance = Testee.nothing();
            let getOrElse = instance.getOrElseRun(() => 1);
            expect(getOrElse).to.be.equal(1);
        });

        it("isJust", () => {
            const instance = Testee.fromNullable(null);
            expect(instance.isJust).to.be.equal(false);
        });

        it("isNothing", () => {
            const instance = Testee.fromNullable(null);
            expect(instance.isNothing).to.be.equal(true);
        });

    });

    describe("Just", () => {

        describe("Apply", () => {

            it("ap invokes on Maybe.Just", () => {
                const instance4 = Testee.of(4);
                const add = (a: number) => a + 1;
                const instanceAdd = Testee.of(add);
                const resultMonad = instanceAdd.ap(instance4) as Testee<number>;
                expect(resultMonad).to.be.instanceof(Testee);
                expect(resultMonad.get()).to.be.equal(5);
            });

        });

        describe("Chain", () => {

            it("chain invokes on Maybe.Just", () => {
                const instance = Testee.of(5);
                let chained = instance.chain((value: number): Testee<number> => Testee.of(value + 1));
                expect(chained).to.be.instanceof(Testee);
                const result = chained as Testee<number>;
                expect(result.get()).to.be.equal(6);
            });

        });

        describe("Filterable", () => {

            it("filter on Maybe.Just(1) gives Maybe.Just(1)", () => {
                const instance = Testee.of(1);
                const filtrator = (value: number): Boolean => Boolean(value);

                const result = instance.filter(filtrator);
                expect(result.isJust).to.be.true;
            });

            it("filter on Maybe.Just(0) gives Maybe.Nothing", () => {
                const instance = Testee.of(0);
                const filtrator = (value: number): Boolean => Boolean(value);

                const result = instance.filter(filtrator);
                expect(result.isNothing).to.be.true;
            });

            it("distributivity", () => {
                const v = Testee.of(5);
                const p = (value: number) => Boolean(value);
                const q = (value: number) => value > 3;

                const result1 = v.filter(x => p(x) && q(x));
                const result2 = v.filter(p).filter(q);

                expect(result1.get()).to.be.equal(result2.get());
            });

            it("identity", () => {
                const v = Testee.of(5);
                const p = (_: number) => true;

                const result1 = v.filter(p);

                expect(result1.get()).to.be.equal(v.get());
            });

            it("annihilation", () => {
                const v = Testee.of(5);
                const p = (_: number) => false;

                const result1 = v.filter(p);

                expect(result1.isNothing).to.be.true;
            });

        });

        it("get", () => {
            const instance = Testee.of(5);
            expect(instance.get()).to.be.equal(5);
        });

        it("join", () => {
            const instance = Testee.of(3);
            expect(instance.join()).to.be.instanceof(Testee);
            expect(instance.join().getOrElse(2)).to.be.equal(3);
        });

        it("join. nested", () => {
            const instance = Testee.of(Testee.of(3));
            expect(instance.join()).to.be.instanceof(Testee);
            expect(instance.join().getOrElse(2)).to.be.equal(3);
        });

        it("getOrElse", () => {
            const instance = Testee.of(0);
            let getOrElse = instance.getOrElse(1);
            expect(getOrElse).to.be.equal(0);
        });

        it("getOrElseRun", () => {
            const instance = Testee.of(0);
            let getOrElse = instance.getOrElseRun(() => 1);
            expect(getOrElse).to.be.equal(0);
        });

        it("isJust", () => {
            const instance = Testee.fromNullable(123);
            expect(instance.isJust).to.be.equal(true);
        });

        it("isNothing", () => {
            const instance = Testee.fromNullable(123);
            expect(instance.isNothing).to.be.equal(false);
        });

    });

});
