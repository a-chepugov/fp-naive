import {expect} from "chai";

import Testee from "./index";
import identity from "../../utilities/identity";

describe("Either", () => {

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

            it("map", () => {
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
                const addMonad = Testee.right(add);
                const resultMonad = either.ap(addMonad);
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

        describe("Functor", () => {

            it("map", () => {
                const maybe = Testee.right(5);
                let mapped = maybe.map((value: number) => value + 1);
                expect(mapped).to.be.instanceof(Testee);
                expect(mapped.get()).to.be.equal(6);
            });

            it("identity", () => {
                const value = Math.floor(Math.random() * 100);
                const instance = Testee.right(value);
                const result = instance.map(identity) as Testee<any, number>;
                expect(result.get()).to.be.equal(value);
            });

            it("composition", () => {
                const value = Math.floor(Math.random() * 100);
                const addition = Math.floor(Math.random() * 100);
                const multiplier = Math.floor(Math.random() * 100);

                const add = (a: number) => a + addition;
                const mul = (a: number) => a + multiplier;

                const instance = Testee.right(value);

                const r1 = instance.map((a: number) => mul(add(a))) as Testee<any, number>;
                const r2 = instance.map(add).map(mul) as Testee<any, number>;

                expect(r1.get()).to.be.equal(r2.get());
            });

        });

        describe("Apply", () => {

            it("ap", () => {
                const maybe5 = Testee.right(4);
                const add = (a: number) => a + 1;
                const maybeAdd = Testee.right(add);
                const resultMonad = maybe5.ap(maybeAdd) as Testee<any, number>;
                expect(resultMonad).to.be.instanceof(Testee);
                expect(resultMonad.get()).to.be.equal(5);
            });

            it("composition", () => {
                const value = Math.floor(Math.random() * 100);
                const addition = Math.floor(Math.random() * 100);
                const multiplier = Math.floor(Math.random() * 100);

                const add = (a: number) => a + addition;
                const mul = (a: number) => a + multiplier;

                const vT = Testee.right(value);
                const aT = Testee.right(add);
                const mT = Testee.right(mul);

                const transform =
                    (f: (a: number) => number) =>
                        (g: (a: number) => number) =>
                            (x: number) =>
                                f(g(x));

                const r1 = vT.ap(aT.ap(mT.map(transform))) as Testee<any, number>;
                const r2 = vT.ap(mT).ap(aT) as Testee<any, number>;

                expect(r1.get()).to.be.equal(r2.get());
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
