import {expect} from "chai";

import Either from "./index";

describe("Either", () => {

    describe("Either", () => {

        it("just", () => {
            const maybe = Either.just(5);
            expect(maybe).to.be.instanceof(Either);
        });

        it("nothing", () => {
            const maybe = Either.nothing();
            expect(maybe).to.be.instanceof(Either);
        });

        it("fromNullable", () => {
            const maybe = Either.fromNullable(1);
            expect(maybe).to.be.instanceof(Either);
        });

        it("of", () => {
            const maybe = Either.of(1);
            expect(maybe).to.be.instanceof(Either);
        });

        it("get", () => {
            const maybe = Either.of(1);
            expect(maybe).to.be.instanceof(Either);
            expect(maybe.get()).to.be.equal(1);
        });
    });

    describe("Right", () => {

        it("value", () => {
            const maybe = Either.just(5);
            expect(maybe.get()).to.be.equal(5);
        });

        it("map", () => {
            const maybe = Either.just(5);
            let mapped = maybe.map((value: number) => value + 1);
            expect(mapped).to.be.instanceof(Either);

            // @ts-ignore
            expect(mapped.get()).to.be.equal(6);
        });

        it("ap", () => {
            const maybe5 = Either.just(4);
            const add = (a: number) => a + 1;
            const maybeAdd = Either.just(add);
            const resultMonad = maybe5.ap(maybeAdd);

            // @ts-ignore
            expect(resultMonad.get()).to.be.equal(5);
        });

        it("chain", () => {
            const maybe = Either.just(5);
            let chained = maybe.chain((value: number): Either<number> => Either.just(value + 1));

            // @ts-ignore
            expect(chained.get()).to.be.equal(6);
        });

        it("getOrElse", () => {
            const maybe = Either.just(0);
            let getOrElse = maybe.getOrElse(1);
            expect(getOrElse).to.be.equal(0);
        });

        it("isRight", () => {
            const maybe = Either.fromNullable(123);
            expect(maybe.isRight).to.be.equal(true);
        });

        it("isLeft", () => {
            const maybe = Either.fromNullable(123);
            expect(maybe.isLeft).to.be.equal(false);
        });

    });

    describe("Left", () => {

        it("value", () => {
            const maybe = Either.nothing();
            expect(() => maybe.get()).to.throw();
        });

        it("map", () => {
            const maybe = Either.nothing();
            let mapped = maybe.map((value: number) => value + 1);
            expect(mapped).to.be.instanceof(Either);
            expect(() => maybe.get()).to.throw();
        });


        it("ap", () => {
            const maybe = Either.nothing();
            const add = (a: number) => a + 1;
            const addMonad = Either.just(add);
            const resultMonad = maybe.ap(addMonad);

            // @ts-ignore
            expect(() => resultMonad.get()).to.throw();
        });

        it("chain", () => {
            const maybe = Either.nothing();
            const fn = (value: number): Either<number> => Either.just(value + 1)
            let chained = maybe.chain(fn);

            // @ts-ignore
            expect(() => chained.get()).to.throw();
        });

        it("getOrElse", () => {
            const maybe = Either.nothing();
            let getOrElse = maybe.getOrElse(1);
            expect(getOrElse).to.be.equal(1);
        });

        it("isRight", () => {
            const maybe = Either.fromNullable(null);
            expect(maybe.isRight).to.be.equal(false);
        });

        it("isLeft", () => {
            const maybe = Either.fromNullable(null);
            expect(maybe.isLeft).to.be.equal(true);
        });
        //
    });

});
