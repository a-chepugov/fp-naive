import {expect} from "chai";

import identity from "../../utilities/identity";

import Testee from "./index";

describe("Maybe", () => {

    describe("Maybe", () => {

        it("just", () => {
            const maybe = Testee.just(5);
            expect(maybe).to.be.instanceof(Testee);
        });

        it("nothing", () => {
            const maybe = Testee.nothing();
            expect(maybe).to.be.instanceof(Testee);
        });

        it("fromNullable", () => {
            const maybe = Testee.fromNullable(1);
            expect(maybe).to.be.instanceof(Testee);
        });

        it("of", () => {
            const maybe = Testee.of(1);
            expect(maybe).to.be.instanceof(Testee);
        });

    });

    describe("Just", () => {

        it("get", () => {
            const maybe = Testee.just(5);
            expect(maybe.get()).to.be.equal(5);
        });

        it("map", () => {
            const maybe = Testee.just(5);
            let mapped = maybe.map((value: number) => value + 1);
            expect(mapped).to.be.instanceof(Testee);
            expect(mapped.get()).to.be.equal(6);
        });

        it("ap", () => {
            const maybe5 = Testee.just(4);
            const add = (a: number) => a + 1;
            const maybeAdd = Testee.just(add);
            const resultMonad = maybe5.ap(maybeAdd) as Testee<number>;
            expect(resultMonad).to.be.instanceof(Testee);
            expect(resultMonad.get()).to.be.equal(5);
        });

        it("chain", () => {
            const maybe = Testee.just(5);
            let chained = maybe.chain((value: number): Testee<number> => Testee.just(value + 1));
            expect(chained).to.be.instanceof(Testee);
            expect(chained.get()).to.be.equal(6);
        });

        it("filter. positive", () => {
            const maybe = Testee.just(3);
            expect(maybe.filter(a => a === 3).isJust).to.be.true;
        });

        it("filter. negative", () => {
            const maybe = Testee.just(3);
            expect(maybe.filter(a => a !== 3).isJust).to.be.false;
        });

        it("join", () => {
            const maybe = Testee.just(3);
            expect(maybe.join()).to.be.instanceof(Testee);
            expect(maybe.join().getOrElse(2)).to.be.equal(3);
        });

        it("join. nested", () => {
            const maybe = Testee.just(Testee.just(3));
            expect(maybe.join()).to.be.instanceof(Testee);
            expect(maybe.join().getOrElse(2)).to.be.equal(3);
        });

        it("getOrElse", () => {
            const maybe = Testee.just(0);
            let getOrElse = maybe.getOrElse(1);
            expect(getOrElse).to.be.equal(0);
        });

        it("getOrElseRun", () => {
            const maybe = Testee.just(0);
            let getOrElse = maybe.getOrElseRun(() => 1);
            expect(getOrElse).to.be.equal(0);
        });

        it("isJust", () => {
            const maybe = Testee.fromNullable(123);
            expect(maybe.isJust).to.be.equal(true);
        });

        it("isNothing", () => {
            const maybe = Testee.fromNullable(123);
            expect(maybe.isNothing).to.be.equal(false);
        });

        describe("Functor", () => {

            it("identity", () => {
                const value = Math.floor(Math.random() * 100);
                const instance = Testee.just(value);
                expect(instance.map(identity).get()).to.be.equal(value);
            });

            it("composition", () => {
                const value = Math.floor(Math.random() * 100);
                const addition = Math.floor(Math.random() * 100);
                const multiplier = Math.floor(Math.random() * 100);

                const add = (a: number) => a + addition;
                const mul = (a: number) => a + multiplier;

                const instance = Testee.just(value);

                const r1 = instance.map((a: number) => mul(add(a)));
                const r2 = instance.map(add).map(mul);

                expect(r1.get()).to.be.equal(r2.get());
            });

        });

        describe("Apply", () => {

            it("composition", () => {
                const value = Math.floor(Math.random() * 100);
                const addition = Math.floor(Math.random() * 100);
                const multiplier = Math.floor(Math.random() * 100);

                const add = (a: number) => a + addition;
                const mul = (a: number) => a + multiplier;

                const vT = Testee.just(value);
                const aT = Testee.just(add);
                const mT = Testee.just(mul);

                const transform =
                    (f: (a: number) => number) =>
                        (g: (a: number) => number) =>
                            (x: number) =>
                                f(g(x));

                const r1 = vT.ap(aT.ap(mT.map(transform))) as Testee<number>;
                const r2 = vT.ap(mT).ap(aT) as Testee<number>;

                expect(r1.get()).to.be.equal(r2.get());
            });

        });

    });

    describe("Nothing", () => {

        it("get", () => {
            const maybe = Testee.nothing();
            expect(() => maybe.get()).to.throw();
        });

        it("map", () => {
            const maybe = Testee.nothing();
            let counter = 0;
            let mapped = maybe.map((value: number) => counter++);
            expect(mapped).to.be.instanceof(Testee);
            expect(counter).to.be.equal(0);
        });


        it("ap", () => {
            const maybe = Testee.nothing();
            let counter = 0;
            const add = (a: number) => counter++;
            const addMonad = Testee.just(add);
            const resultMonad = maybe.ap(addMonad);
            expect(resultMonad).to.be.instanceof(Testee);
            expect(counter).to.be.equal(0);
        });

        it("chain", () => {
            const maybe = Testee.nothing();
            let counter = 0;
            const fn = (value: number): Testee<number> => Testee.just(counter++)
            let chained = maybe.chain(fn);
            expect(chained).to.be.instanceof(Testee);
            expect(counter).to.be.equal(0);
        });

        it("filter", () => {
            const maybe = Testee.nothing();
            expect(maybe.filter(a => a === 3).isNothing).to.be.true;
        });

        it("join", () => {
            const maybe = Testee.nothing();
            expect(maybe.join().isNothing).to.be.true;
        });

        it("getOrElse", () => {
            const maybe = Testee.nothing();
            let getOrElse = maybe.getOrElse(1);
            expect(getOrElse).to.be.equal(1);
        });

        it("getOrElseRun", () => {
            const maybe = Testee.nothing();
            let getOrElse = maybe.getOrElseRun(() => 1);
            expect(getOrElse).to.be.equal(1);
        });

        it("isJust", () => {
            const maybe = Testee.fromNullable(null);
            expect(maybe.isJust).to.be.equal(false);
        });

        it("isNothing", () => {
            const maybe = Testee.fromNullable(null);
            expect(maybe.isNothing).to.be.equal(true);
        });

    });

});
