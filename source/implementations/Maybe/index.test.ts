import {expect} from "chai";

import identity from "../../utilities/identity";

import Testee from "./index";

describe("Maybe", () => {

    describe("Maybe prototype", () => {

        describe("Applicative", () => {

            it("of returns Maybe", () => {
                const maybe = Testee.of(1);
                expect(maybe).to.be.instanceof(Testee);
            });

        });

        it("just returns Maybe.Just", () => {
            const maybe = Testee.just(5);
            expect(maybe.isJust).to.be.true;
        });

        it("nothing returns Maybe.Nothing", () => {
            const maybe = Testee.nothing();
            expect(maybe.isNothing).to.be.true;
        });

        it("fromNullable for non nulls return Maybe.Just", () => {
            const maybe = Testee.fromNullable(1);
            expect(maybe.isJust).to.be.true;
        });

        it("fromNullable for null return Maybe.Nothing", () => {
            const maybe = Testee.fromNullable(null);
            expect(maybe.isNothing).to.be.true;
        });

    });

    describe("Nothing", () => {

        describe("Functor", () => {

            it("map skips on Maybe.Nothing", () => {
                const maybe = Testee.nothing();
                let counter = 0;
                let mapped = maybe.map((value: number) => ++counter);
                expect(mapped).to.be.instanceof(Testee);
                expect(counter).to.be.equal(0);
            });

        });

        describe("Apply", () => {

            it("ap skips on Maybe.Nothing", () => {
                const maybe = Testee.nothing();
                let counter = 0;
                const add = (a: number) => counter++;
                const addMonad = Testee.just(add);
                const resultMonad = maybe.ap(addMonad);
                expect(resultMonad).to.be.instanceof(Testee);
                expect(counter).to.be.equal(0);
            });

        });

        describe("Chain", () => {

            it("chain skips on Maybe.Nothing", () => {
                const maybe = Testee.nothing();
                let counter = 0;
                const fn = (value: number): Testee<number> => Testee.just(++counter)
                let chained = maybe.chain(fn);
                expect(chained).to.be.instanceof(Testee);
                expect(counter).to.be.equal(0);
            });

        });

        describe("Filterable", () => {

            it("filter on Maybe.Nothing gives Maybe.Nothing", () => {
                const instance = Testee.nothing(1);
                const filtrator = (value: number) => Boolean(value);

                const result = instance.filter(filtrator);
                expect(result.isNothing).to.be.true;
            });

        });

        it("get throws on Maybe.Nothing", () => {
            const maybe = Testee.nothing();
            expect(() => maybe.get()).to.throw();
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

    describe("Just", () => {

        describe("Functor", () => {

            it("map invokes on Maybe.Just", () => {
                const maybe = Testee.just(5);
                let mapped = maybe.map((value: number) => ++value);
                expect(mapped).to.be.instanceof(Testee);
                expect(mapped.get()).to.be.equal(6);
            });

            it("identity", () => {
                const value = Math.floor(Math.random() * 100);
                const instance = Testee.just(value);
                const result = instance.map(identity) as Testee<number>;
                expect(result.get()).to.be.equal(value);
            });

            it("composition", () => {
                const value = Math.floor(Math.random() * 100);
                const addition = Math.floor(Math.random() * 100);
                const multiplier = Math.floor(Math.random() * 100);

                const add = (a: number) => a + addition;
                const mul = (a: number) => a + multiplier;

                const instance = Testee.just(value);

                const r1 = instance.map((a: number) => mul(add(a))) as Testee<number>;
                const r2 = instance.map(add).map(mul) as Testee<number>;

                expect(r1.get()).to.be.equal(r2.get());
            });

        });

        describe("Apply", () => {

            it("ap invokes on Maybe.Just", () => {
                const maybe5 = Testee.just(4);
                const add = (a: number) => a + 1;
                const maybeAdd = Testee.just(add);
                const resultMonad = maybe5.ap(maybeAdd) as Testee<number>;
                expect(resultMonad).to.be.instanceof(Testee);
                expect(resultMonad.get()).to.be.equal(5);
            });

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

        describe("Chain", () => {

            it("chain invokes on Maybe.Just", () => {
                const maybe = Testee.just(5);
                let chained = maybe.chain((value: number): Testee<number> => Testee.just(value + 1));
                expect(chained).to.be.instanceof(Testee);
                const result = chained as Testee<number>;
                expect(result.get()).to.be.equal(6);
            });

        });

        describe("Filterable", () => {

            it("filter on Maybe.Just(1) gives Maybe.Just(1)", () => {
                const instance = Testee.just(1);
                const filtrator = (value: number): Boolean => Boolean(value);

                const result = instance.filter(filtrator);
                expect(result.isJust).to.be.true;
            });

            it("filter on Maybe.Just(0) gives Maybe.Nothing", () => {
                const instance = Testee.just(0);
                const filtrator = (value: number): Boolean => Boolean(value);

                const result = instance.filter(filtrator);
                expect(result.isNothing).to.be.true;
            });

            it("distributivity", () => {
                const v = Testee.just(5);
                const p = (value: number) => Boolean(value);
                const q = (value: number) => value > 3;

                const result1 = v.filter(x => p(x) && q(x));
                const result2 = v.filter(p).filter(q);

                expect(result1.get()).to.be.equal(result2.get());
            });

            it("identity", () => {
                const v = Testee.just(5);
                const p = (_: number) => true;

                const result1 = v.filter(p);

                expect(result1.get()).to.be.equal(v.get());
            });

            it("annihilation", () => {
                const v = Testee.just(5);
                const p = (_: number) => false;

                const result1 = v.filter(p);

                expect(result1.isNothing).to.be.true;
            });

        });

        it("get", () => {
            const maybe = Testee.just(5);
            expect(maybe.get()).to.be.equal(5);
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

    });

});
