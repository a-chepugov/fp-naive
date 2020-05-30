import {expect} from "chai";

import Testee from "./index";

import FunctorTests from "../../interfaces/Functor/index.tests";
import ApplyTests from "../../interfaces/Apply/index.tests";
import ApplicativeTests from "../../interfaces/Applicative/index.tests";
import ChainTests from "../../interfaces/Chain/index.tests";

describe("Either", () => {

    describe("laws", () => {
        FunctorTests(Testee);
        ApplyTests(Testee);
        ApplicativeTests(Testee);
        ChainTests(Testee);
    });

    describe("Either prototype", () => {

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

            it("skips map method", () => {
                const maybe = Testee.left();
                let counter = 0;
                let mapped = maybe.map((_: number) => counter++);
                expect(mapped).to.be.instanceof(Testee);
                expect(counter).to.be.equal(0);
            });

        });

        describe("Apply", () => {

            it("skips ap method", () => {
                const instance = Testee.right();
                let counter = 0;
                const add = (_: number) => counter++;
                const instanceAdd = Testee.left(add);
                instanceAdd.ap(instance);
                expect(counter).to.be.equal(0);
            });

        });

        describe("Chain", () => {

            it("skips chain method", () => {
                const either = Testee.left();
                let counter = 0;
                const fn = (_: number): Testee<Error, number> => Testee.right(counter++);
                either.chain(fn);
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
