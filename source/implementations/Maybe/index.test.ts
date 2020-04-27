import {expect} from "chai";

import Maybe from "./index";

describe("Maybe", () => {

    describe("Maybe", () => {

        it("just", () => {
            const maybe = Maybe.just(5);
            expect(maybe).to.be.instanceof(Maybe);
        });

        it("nothing", () => {
            const maybe = Maybe.nothing();
            expect(maybe).to.be.instanceof(Maybe);
        });

        it("fromNullable", () => {
            const maybe = Maybe.fromNullable(1);
            expect(maybe).to.be.instanceof(Maybe);
        });

        it("of", () => {
            const maybe = Maybe.of(1);
            expect(maybe).to.be.instanceof(Maybe);
        });

    });

    describe("Just", () => {

        it("value", () => {
            const maybe = Maybe.just(5);
            expect(maybe.get()).to.be.equal(5);
        });

        it("map", () => {
            const maybe = Maybe.just(5);
            let mapped = maybe.map((value: number) => value + 1);
            expect(mapped).to.be.instanceof(Maybe);
            expect(mapped.get()).to.be.equal(6);
        });

        it("ap", () => {
            const maybe5 = Maybe.just(4);
            const add = (a: number) => a + 1;
            const maybeAdd = Maybe.just(add);
            const resultMonad = maybe5.ap(maybeAdd) as Maybe<number>;
            expect(resultMonad).to.be.instanceof(Maybe);
            expect(resultMonad.get()).to.be.equal(5);
        });

        it("chain", () => {
            const maybe = Maybe.just(5);
            let chained = maybe.chain((value: number): Maybe<number> => Maybe.just(value + 1));
            expect(chained).to.be.instanceof(Maybe);
            expect(chained.get()).to.be.equal(6);
        });

        it("filter. positive", () => {
            const maybe = Maybe.just(3);
            expect(maybe.filter(a => a === 3).isJust).to.be.true;
        });

        it("filter. negative", () => {
            const maybe = Maybe.just(3);
            expect(maybe.filter(a => a !== 3).isJust).to.be.false;
        });

        it("join", () => {
            const maybe = Maybe.just(3);
            expect(maybe.join()).to.be.instanceof(Maybe);
            expect(maybe.join().getOrElse(2)).to.be.equal(3);
        });

        it("join. nested", () => {
            const maybe = Maybe.just(Maybe.just(3));
            expect(maybe.join()).to.be.instanceof(Maybe);
            expect(maybe.join().getOrElse(2)).to.be.equal(3);
        });

        it("getOrElse", () => {
            const maybe = Maybe.just(0);
            let getOrElse = maybe.getOrElse(1);
            expect(getOrElse).to.be.equal(0);
        });

        it("getOrElseRun", () => {
            const maybe = Maybe.just(0);
            let getOrElse = maybe.getOrElseRun(() => 1);
            expect(getOrElse).to.be.equal(0);
        });

        it("isJust", () => {
            const maybe = Maybe.fromNullable(123);
            expect(maybe.isJust).to.be.equal(true);
        });

        it("isNothing", () => {
            const maybe = Maybe.fromNullable(123);
            expect(maybe.isNothing).to.be.equal(false);
        });

    });

    describe("Nothing", () => {

        it("value", () => {
            const maybe = Maybe.nothing();
            expect(() => maybe.get()).to.throw();
        });

        it("map", () => {
            const maybe = Maybe.nothing();
            let counter = 0;
            let mapped = maybe.map((value: number) => counter++);
            expect(mapped).to.be.instanceof(Maybe);
            expect(counter).to.be.equal(0);
        });


        it("ap", () => {
            const maybe = Maybe.nothing();
            let counter = 0;
            const add = (a: number) => counter++;
            const addMonad = Maybe.just(add);
            const resultMonad = maybe.ap(addMonad);
            expect(resultMonad).to.be.instanceof(Maybe);
            expect(counter).to.be.equal(0);
        });

        it("chain", () => {
            const maybe = Maybe.nothing();
            let counter = 0;
            const fn = (value: number): Maybe<number> => Maybe.just(counter++)
            let chained = maybe.chain(fn);
            expect(chained).to.be.instanceof(Maybe);
            expect(counter).to.be.equal(0);
        });

        it("filter", () => {
            const maybe = Maybe.nothing();
            expect(maybe.filter(a => a === 3).isNothing).to.be.true;
        });

        it("join", () => {
            const maybe = Maybe.nothing();
            expect(maybe.join().isNothing).to.be.true;
        });

        it("getOrElse", () => {
            const maybe = Maybe.nothing();
            let getOrElse = maybe.getOrElse(1);
            expect(getOrElse).to.be.equal(1);
        });

        it("getOrElseRun", () => {
            const maybe = Maybe.nothing();
            let getOrElse = maybe.getOrElseRun(() => 1);
            expect(getOrElse).to.be.equal(1);
        });

        it("isJust", () => {
            const maybe = Maybe.fromNullable(null);
            expect(maybe.isJust).to.be.equal(false);
        });

        it("isNothing", () => {
            const maybe = Maybe.fromNullable(null);
            expect(maybe.isNothing).to.be.equal(true);
        });

    });

});
