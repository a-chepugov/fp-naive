import {expect} from "chai";

import Either from "./index";

describe("Either", () => {

    describe("Either", () => {

        it("right", () => {
            const either = Either.right(5);
            expect(either).to.be.instanceof(Either);
        });

        it("left", () => {
            const either = Either.left();
            expect(either).to.be.instanceof(Either);
        });

        it("of", () => {
            const either = Either.of(undefined, 1);
            expect(either).to.be.instanceof(Either);
        });

        it("swap Left", () => {
            const either = Either.left(1);
            expect(either.isLeft).to.be.true;
            expect(either.swap().isRight).to.be.true;
        });

        it("swap Right", () => {
            const either = Either.right(1);
            expect(either.isRight).to.be.true;
            expect(either.swap().isLeft).to.be.true;
        });

    });

    describe("Right", () => {

        it("value", () => {
            const either = Either.right(5);
            expect(either.get()).to.be.equal(5);
        });

        it("map", () => {
            const either = Either.right(5);
            let mapped = either.map((value: number) => value + 1);
            expect(mapped).to.be.instanceof(Either);

            // @ts-ignore
            expect(mapped.get()).to.be.equal(6);
        });

        it("ap", () => {
            const either5 = Either.right(4);
            const add = (a: number) => a + 1;
            const eitherAdd = Either.right(add);
            const resultMonad = either5.ap(eitherAdd);

            // @ts-ignore
            expect(resultMonad.get()).to.be.equal(5);
        });

        it("chain", () => {
            const either = Either.right(5);
            let chained = either.chain((value: number): Either<Error, number> => Either.right(value + 1));

            // @ts-ignore
            expect(chained.get()).to.be.equal(6);
        });

        it("bimap", () => {
            const either = Either.right();
            let counterL = 0;
            let counterR = 0;
            let bimapped = either.bimap((value: number) => counterL++, (value: number) => counterR++);
            expect(bimapped).to.be.instanceof(Either);
            expect(counterL).to.be.equal(0);
            expect(counterR).to.be.equal(1);
        });

        it("getOrElse", () => {
            const either = Either.right(0);
            let getOrElse = either.getOrElse(1);
            expect(getOrElse).to.be.equal(0);
        });

        it("isRight", () => {
            const either = Either.right(123);
            expect(either.isRight).to.be.true;
        });

        it("isLeft", () => {
            const either = Either.right(123);
            expect(either.isLeft).to.be.false;
        });

    });

    describe("Left", () => {

        it("value", () => {
            const either = Either.left();
            expect(() => either.get()).to.throw();
        });

        it("map", () => {
            const either = Either.left();
            let counter = 0;
            let mapped = either.map((value: number) => counter++);
            expect(mapped).to.be.instanceof(Either);
            expect(counter).to.be.equal(0);
        });


        it("ap", () => {
            const either = Either.left();
            let counter = 0;
            const add = (a: number) => counter++;
            const addMonad = Either.right(add);
            const resultMonad = either.ap(addMonad);
            expect(resultMonad).to.be.instanceof(Either);
            expect(counter).to.be.equal(0);
        });

        it("chain", () => {
            const either = Either.left();
            let counter = 0;
            const fn = (value: number): Either<Error, number> => Either.right(counter++)
            let chained = either.chain(fn);
            expect(chained).to.be.instanceof(Either);
            expect(counter).to.be.equal(0);
        });

        it("bimap", () => {
            const either = Either.left();
            let counterL = 0;
            let counterR = 0;
            let bimapped = either.bimap((value: number) => counterL++, (value: number) => counterR++);
            expect(bimapped).to.be.instanceof(Either);
            expect(counterL).to.be.equal(1);
            expect(counterR).to.be.equal(0);
        });

        it("getOrElse", () => {
            const either = Either.left();
            let getOrElse = either.getOrElse(1);
            expect(getOrElse).to.be.equal(1);
        });

        it("isRight", () => {
            const either = Either.left(new Error(''));
            expect(either.isRight).to.be.false;
        });

        it("isLeft", () => {
            const either = Either.left(new Error(''));
            expect(either.isLeft).to.be.true;
        });

    });

});
