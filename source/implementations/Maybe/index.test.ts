import {expect} from "chai";

import Testee from "./index";

import FunctorTests from "../../interfaces/Functor/index.tests";
import ApplyTests from "../../interfaces/Apply/index.tests";
import ApplicativeTests from "../../interfaces/Applicative/index.tests";
import ChainTests from "../../interfaces/Chain/index.tests";
import MonadTests from "../../interfaces/Monad/index.tests";
import FoldableTests from "../../interfaces/Foldable/index.tests";
import TraversableTests from "../../interfaces/Traversable/index.tests";
import Filterable from "../../interfaces/Filterable/index.tests";

describe("Maybe", () => {

    describe("laws", () => {
        FunctorTests(Testee);
        ApplyTests(Testee);
        ApplicativeTests(Testee);
        ChainTests(Testee);
        MonadTests(Testee);
        FoldableTests(Testee);
        TraversableTests(Testee);
        Filterable(Testee);
    });

    describe("Maybe prototype", () => {

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
                let mapped = maybe.map((_: number) => counter++);
                expect(mapped).to.be.instanceof(Testee);
                expect(counter).to.be.equal(0);
            });

        });

        describe("Apply", () => {

            it("skips ap function", () => {
                const instance = Testee.just(5);
                let counter = 0;
                const add = (_: number) => counter++;
                const instanceAdd = Testee.nothing(add);
                instanceAdd.ap(instance);
                expect(counter).to.be.equal(0);
            });

        });

        describe("Chain", () => {

            it("skips chain function", () => {
                const instance = Testee.nothing();
                let counter = 0;
                const fn = (_: number): Testee<number> => Testee.of(++counter);
                instance.chain(fn);
                expect(counter).to.be.equal(0);
            });

        });

        describe("Filterable", () => {

            it("skips filter function", () => {
                const instance = Testee.nothing(1);
                let counter = 0;
                const filtrator = (x: number): boolean => {
                    counter++;
                    return !!x;
                };

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
