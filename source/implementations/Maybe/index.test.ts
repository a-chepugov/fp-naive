import {expect} from "chai";

import Testee from "./index";

import random from "../../helpers/random";

const equal = (r1: any, r2: any) => {
    expect(r1).to.be.deep.equal(r2);
};

describe("Maybe", () => {

    const x = random(0, 100);
    const y = random(0, 100);
    const f = (a: number) => a + 2;
    const g = (a: number) => a * 3;
    const p = (x: any) => Boolean(x);
    const q = (x: any) => x > 3;

    const Identity = require("../../implementations/Identity").default;
    const Either = require("../../implementations/Either").default;

    const F = Identity;
    const G = Either;

    describe("laws", () => {
        require('../../interfaces/Functor/index.test').default(Testee, {x, f, g}, {equal});
        require('../../interfaces/Apply/index.test').default(Testee, {x, f, g}, {equal});
        require('../../interfaces/Applicative/index.test').default(Testee, {x, f}, {equal});
        require('../../interfaces/Chain/index.test').default(Testee, {x, f, g}, {equal});
        require('../../interfaces/Monad/index.test').default(Testee, {x, f}, {equal});
        require('../../interfaces/Foldable/index.test').default(Testee, {x, i: 1}, {equal});
        require('../../interfaces/Traversable/index.test').default(Testee, {x, F, G}, {equal});
        require('../../interfaces/Filterable/index.test').default(Testee, {x, y, p, q}, {equal});
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
