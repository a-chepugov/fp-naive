import {expect} from "chai";

import Testee from "./index";

import Bifunctor from "../../interfaces/Bifunctor/index.tests";

import random from "../../utilities/random";

describe("Either", () => {

    const x = random(0, 100);
    const y = random(0, 100);
    const f = (a: number) => a + 2;
    const g = (a: number) => a * 3;
    const h = (a: number) => a + 2;
    const i = (a: number) => a * 3;

    const Identity = require("../../implementations/Identity").default;
    const Maybe = require("../../implementations/Maybe").default;

    const F = Identity;
    const G = Maybe;

    describe("laws", () => {
        require('../../interfaces/Functor/index.tests').default(Testee, {x, f, g});
        require('../../interfaces/Apply/index.tests').default(Testee, {x, f, g});
        require('../../interfaces/Applicative/index.tests').default(Testee, {x, f});
        require('../../interfaces/Chain/index.tests').default(Testee, {x, f, g});
        require('../../interfaces/Monad/index.tests').default(Testee, {x, f});
        require('../../interfaces/Bifunctor/index.tests').default(Testee, {x, y, f, g, h, i});
        require('../../interfaces/Foldable/index.tests').default(Testee, {x, i: 1});
        require('../../interfaces/Traversable/index.tests').default(Testee, {x, F, G});
    });

    describe("Either prototype", () => {

        it("Either.left gives Either.Left", () => {
            const either = Testee.left(x);
            expect(either.isLeft).to.be.true;
        });

        it("Either.right gives Either.Right", () => {
            const either = Testee.right(y);
            expect(either.isRight).to.be.true;
        });

        it("swap on Either.Left gives Either.Right", () => {
            const either = Testee.left(x);
            expect(either.isLeft).to.be.true;
            expect(either.swap().isRight).to.be.true;
        });

        it("swap on Either.Right gives Either.Left", () => {
            const either = Testee.right(y);
            expect(either.isRight).to.be.true;
            expect(either.swap().isLeft).to.be.true;
        });

    });

    describe("Left", () => {

        it("get", () => {
            const either = Testee.left(5);
            expect(either.get()).to.be.equal(5);
        });

        describe("Functor", () => {

            it("skips map function", () => {
                const maybe = Testee.left(x);
                let counter = 0;
                let mapped = maybe.map((_: number) => counter++);
                expect(mapped).to.be.instanceof(Testee);
                expect(counter).to.be.equal(0);
            });

        });

        describe("Apply", () => {

            it("skips ap function", () => {
                const instance = Testee.right<Error, number>(x);
                let counter = 0;
                const add = (_: number) => counter++;
                const instanceAdd = Testee.left<Error, (_: number) => number>(new Error('No function'));
                instanceAdd.ap(instance);
                expect(counter).to.be.equal(0);
            });

        });

        describe("Chain", () => {

            it("skips chain function", () => {
                const either = Testee.left<Error, number>(new Error('NaN'));
                let counter = 0;
                const fn = (_: number): Testee<Error, number> => Testee.right(counter++);
                either.chain(fn);
                expect(counter).to.be.equal(0);
            });

        });

        describe("Bifunctor", () => {

            it("skips bimap right function", () => {
                const either = Testee.left(x);
                let counterL = 0;
                let counterR = 0;
                let bimapped = either.bimap((_: number) => counterL++, (_: number) => counterR++);
                expect(bimapped.isLeft).to.be.true;
                expect(counterL).to.be.equal(1);
                expect(counterR).to.be.equal(0);
            });

        });

        it("getOrElse", () => {
            const either = Testee.left(x);
            let getOrElse = either.getOrElse(1);
            expect(getOrElse).to.be.equal(1);
        });

        it("isRight", () => {
            const either = Testee.left(new Error(''));
            expect(either.isRight).to.be.false;
        });

        it("isLeft", () => {
            const either = Testee.left(new Error(''));
            expect(either.isLeft).to.be.true;
        });

    });

    describe("Right", () => {

        it("get", () => {
            const either = Testee.right(5);
            expect(either.get()).to.be.equal(5);
        });

        describe("Bifunctor", () => {

            it("skips bimap left function", () => {
                const either = Testee.right(x);
                let counterL = 0;
                let counterR = 0;
                let bimapped = either.bimap((_: number) => counterL++, (_: number) => counterR++);
                expect(bimapped.isRight).to.be.true;
                expect(counterL).to.be.equal(0);
                expect(counterR).to.be.equal(1);
            });

        });

        it("getOrElse", () => {
            const either = Testee.right(0);
            let getOrElse = either.getOrElse(1);
            expect(getOrElse).to.be.equal(0);
        });

        it("isRight", () => {
            const either = Testee.right(123);
            expect(either.isRight).to.be.true;
        });

        it("isLeft", () => {
            const either = Testee.right(123);
            expect(either.isLeft).to.be.false;
        });

    });

});
