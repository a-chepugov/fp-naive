import {expect} from "chai";

import Either from "./index";

describe("Either", () => {

    describe("Either", () => {

        it("right", () => {
            const maybe = Either.right(5);
            expect(maybe).to.be.instanceof(Either);
        });

        it("left", () => {
            const maybe = Either.left();
            expect(maybe).to.be.instanceof(Either);
        });

        it("of", () => {
            const maybe = Either.of(1);
            expect(maybe).to.be.instanceof(Either);
        });

    });

    describe("Right", () => {

        it("value", () => {
            const maybe = Either.right(5);
            expect(maybe.get()).to.be.equal(5);
        });

        it("map", () => {
            const maybe = Either.right(5);
            let mapped = maybe.map((value: number) => value + 1);
            expect(mapped).to.be.instanceof(Either);

            // @ts-ignore
            expect(mapped.get()).to.be.equal(6);
        });

        it("ap", () => {
            const maybe5 = Either.right(4);
            const add = (a: number) => a + 1;
            const maybeAdd = Either.right(add);
            const resultMonad = maybe5.ap(maybeAdd);

            // @ts-ignore
            expect(resultMonad.get()).to.be.equal(5);
        });

        it("chain", () => {
            const maybe = Either.right(5);
            let chained = maybe.chain((value: number): Either<Error, number> => Either.right(value + 1));

            // @ts-ignore
            expect(chained.get()).to.be.equal(6);
        });

        it("getOrElse", () => {
            const maybe = Either.right(0);
            let getOrElse = maybe.getOrElse(1);
            expect(getOrElse).to.be.equal(0);
        });

        it("isRight", () => {
            const maybe = Either.right(123);
            expect(maybe.isRight).to.be.equal(true);
        });

        it("isLeft", () => {
            const maybe = Either.right(123);
            expect(maybe.isLeft).to.be.equal(false);
        });

    });

    describe("Left", () => {

        it("value", () => {
            const maybe = Either.left();
            expect(() => maybe.get()).to.throw();
        });

        it("map", () => {
            const maybe = Either.left();
            let counter = 0;
            let mapped = maybe.map((value: number) => counter++);
            expect(mapped).to.be.instanceof(Either);
            expect(counter).to.be.equal(0);
        });


        it("ap", () => {
            const maybe = Either.left();
            let counter = 0;
            const add = (a: number) => counter++;
            const addMonad = Either.right(add);
            const resultMonad = maybe.ap(addMonad);
            expect(resultMonad).to.be.instanceof(Either);
            expect(counter).to.be.equal(0);
        });

        it("chain", () => {
            const maybe = Either.left();
            let counter = 0;
            const fn = (value: number): Either<Error, number> => Either.right(counter++)
            let chained = maybe.chain(fn);
            expect(chained).to.be.instanceof(Either);
            expect(counter).to.be.equal(0);
        });

        it("getOrElse", () => {
            const maybe = Either.left();
            let getOrElse = maybe.getOrElse(1);
            expect(getOrElse).to.be.equal(1);
        });

        it("isRight", () => {
            const maybe = Either.left(new Error(''));
            expect(maybe.isRight).to.be.equal(false);
        });

        it("isLeft", () => {
            const maybe = Either.left(new Error(''));
            expect(maybe.isLeft).to.be.equal(true);
        });

    });

});
