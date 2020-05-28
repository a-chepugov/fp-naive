import {expect} from "chai";

import Testee from "./index";

import identity from "../../utilities/identity";
import Maybe from "../Maybe";
import Identity from "./index";

describe("Identity", () => {

    describe("Functor", () => {

        it("map invokes on Maybe.Just", () => {
            const instance = Testee.of(5);
            let mapped = instance.map((value: number) => ++value);
            expect(mapped).to.be.instanceof(Testee);
            expect(mapped.get()).to.be.equal(6);
        });

        it("identity", () => {
            const value = Math.floor(Math.random() * 100);
            const instance = Testee.of(value);
            const result = instance.map(identity) as Testee<number>;
            expect(result.get()).to.be.equal(value);
        });

        it("composition", () => {
            const value = Math.floor(Math.random() * 100);
            const addition = Math.floor(Math.random() * 100);
            const multiplier = Math.floor(Math.random() * 100);

            const add = (a: number) => a + addition;
            const mul = (a: number) => a + multiplier;

            const instance = Testee.of(value);

            const r1 = instance.map((a: number) => mul(add(a))) as Testee<number>;
            const r2 = instance.map(add).map(mul) as Testee<number>;

            expect(r1.get()).to.be.equal(r2.get());
        });

    });

    describe("Apply", () => {

        it("ap invokes on Maybe.Just", () => {
            const instance = Testee.of(4);
            const add = (a: number) => a + 1;
            const instanceAdd = Testee.of(add);
            const resultMonad = instance.ap(instanceAdd) as Testee<number>;
            expect(resultMonad).to.be.instanceof(Testee);
            expect(resultMonad.get()).to.be.equal(5);
        });

        it("composition", () => {
            const value = Math.floor(Math.random() * 100);
            const addition = Math.floor(Math.random() * 100);
            const multiplier = Math.floor(Math.random() * 100);

            const add = (a: number) => a + addition;
            const mul = (a: number) => a + multiplier;

            const vT = Testee.of(value);
            const aT = Testee.of(add);
            const mT = Testee.of(mul);

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

    describe("Applicative", () => {

        it("of returns Maybe", () => {
            const maybe = Testee.of(5);
            expect(maybe).to.be.instanceof(Testee);
        });

    });

    describe("Chain", () => {

        it("chain invokes on Maybe.Just", () => {
            const instance = Testee.of(5);
            let chained = instance.chain((value: number): Testee<number> => Testee.of(value + 1));
            expect(chained).to.be.instanceof(Testee);
            const result = chained as Testee<number>;
            expect(result.get()).to.be.equal(6);
        });

    });

    describe("Traversable", () => {

        it("traverse Identity<number> to Identity<string>", () => {
            const instance = new Testee(5);
            const toStringIdentity = (a: number) => Testee.of(String(a));
            const result = instance.traverse(Testee, toStringIdentity) as Testee<Testee<string>>;
            expect(result.get().get()).to.be.equal('5');
        });

    });

    it("get", () => {
        const instance = Testee.of(5);
        expect(instance.get()).to.be.equal(5);
    });

    it("join", () => {
        const instance = Testee.of(Testee.of(3));
        expect(instance.join()).to.be.instanceof(Testee);
        expect(instance.join().get()).to.be.equal(3);
    });

});
