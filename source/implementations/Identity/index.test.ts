import {expect} from "chai";

import Testee from "./index";
import Maybe from "../Maybe";

import identity from "../../utilities/identity";

describe("Identity", () => {

    describe("Functor", () => {

        it("map invokes on Identity", () => {
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

        it("apply invokes on Identity", () => {
            const instance4 = Testee.of(4);
            const add = (a: number) => a + 1;
            const instanceAdd = Testee.of(add);
            const resultMonad = instanceAdd.ap(instance4) as Testee<number>;
            expect(resultMonad).to.be.instanceof(Testee);
            expect(resultMonad.get()).to.be.equal(5);
        });

        it("consumption", () => {
            const value1 = Math.floor(Math.random() * 100);
            const value2 = Math.floor(Math.random() * 100);
            const value3 = Math.floor(Math.random() * 100);

            const add = (a: number) => (b: number) => a + b;

            const v1 = Testee.of(value1);
            const v2 = Testee.of(value2);
            const v3 = Testee.of(value3);
            const aT = Testee.of(add);

            const r = aT.ap(v1).ap(v2) as Testee<number>;

            expect(r.get()).to.be.equal(value1 + value2);
        });

    });


    describe("Applicative", () => {

        it("of returns Maybe", () => {
            const maybe = Testee.of(5);
            expect(maybe).to.be.instanceof(Testee);
        });

    });

    describe("Chain", () => {

        it("chain invokes on Identity", () => {
            const instance = Testee.of(5);
            let chained = instance.chain((value: number): Testee<number> => Testee.of(value + 1));
            expect(chained).to.be.instanceof(Testee);
            const result = chained as Testee<number>;
            expect(result.get()).to.be.equal(6);
        });

    });

    describe("Traversable", () => {

        it("traverse 1231Identity to Maybe<Identity>", () => {
            const instance = new Testee(5);
            const toStringEither = (a: number): Maybe<string> => Maybe.of(String(a));
            const result = instance.traverse(undefined, toStringEither) as Maybe<Testee<string>>;

            expect(result).to.be.instanceof(Maybe);
            expect(result.get()).to.be.instanceof(Testee);
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
