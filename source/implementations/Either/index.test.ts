import {expect} from "chai";

import Testee from "./index";
import identity from "../../utilities/identity";

import FunctorTests from "../../interfaces/Functor/index.tests";

describe("Either", () => {

    FunctorTests(Testee);

    describe("Either prototype", () => {

        describe("Applicative", () => {

            it("of", () => {
                const maybe = Testee.of(1);
                expect(maybe).to.be.instanceof(Testee);
            });

        });

        it("Either.left gives Either.Left", () => {
            const either = Testee.left();
            expect(either.isLeft).to.be.true;
        });

        it("Either.right giver Either.Right", () => {
            const either = Testee.right(5);
            expect(either.isRight).to.be.true;
        });

        it("swap on Either.Left gives Either.Right", () => {
            const either = Testee.left(1);
            expect(either.isLeft).to.be.true;
            expect(either.swap().isRight).to.be.true;
        });

        it("swap on Either.Right gives Either.Left", () => {
            const either = Testee.right(1);
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
                const maybe = Testee.left();
                let counter = 0;
                let mapped = maybe.map((value: number) => counter++);
                expect(mapped).to.be.instanceof(Testee);
                expect(counter).to.be.equal(0);
            });

        });

        describe("Apply", () => {

            it("ap", () => {
                const either = Testee.left();
                let counter = 0;
                const add = (a: number) => counter++;
                const instanceAdd = Testee.right(add);
                const resultMonad = instanceAdd.ap(either as Testee<any, number>);
                expect(resultMonad).to.be.instanceof(Testee);
                expect(counter).to.be.equal(0);
            });

        });

        describe("Chain", () => {

            it("chain", () => {
                const either = Testee.left();
                let counter = 0;
                const fn = (value: number): Testee<Error, number> => Testee.right(counter++)
                let chained = either.chain(fn);
                expect(chained).to.be.instanceof(Testee);
                expect(counter).to.be.equal(0);
            });

        });

        it("bimap", () => {
            const either = Testee.left();
            let counterL = 0;
            let counterR = 0;
            let bimapped = either.bimap((value: number) => counterL++, (value: number) => counterR++);
            expect(bimapped).to.be.instanceof(Testee);
            expect(counterL).to.be.equal(1);
            expect(counterR).to.be.equal(0);
        });

        it("getOrElse", () => {
            const either = Testee.left();
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

        describe("Apply", () => {

            it("ap", () => {
                const instance5 = Testee.right(4);
                const add = (a: number) => a + 1;
                const instanceAdd = Testee.right(add);
                const resultMonad = instanceAdd.ap(instance5) as Testee<any, number>;
                expect(resultMonad).to.be.instanceof(Testee);
                expect(resultMonad.get()).to.be.equal(5);
            });

        });

        describe("Chain", () => {

            it("chain", () => {
                const maybe = Testee.right(5);
                let chained = maybe.chain((value: number): Testee<any, number> => Testee.right(value + 1));
                expect(chained).to.be.instanceof(Testee);
                const result = chained as Testee<any, number>;
                expect(result.get()).to.be.equal(6);
            });

        });

        it("bimap", () => {
            const either = Testee.right();
            let counterL = 0;
            let counterR = 0;
            let bimapped = either.bimap((value: number) => counterL++, (value: number) => counterR++);
            expect(bimapped).to.be.instanceof(Testee);
            expect(counterL).to.be.equal(0);
            expect(counterR).to.be.equal(1);
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
