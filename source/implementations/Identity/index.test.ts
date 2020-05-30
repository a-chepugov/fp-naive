import {expect} from "chai";

import Testee from "./index";
import Maybe from "../Maybe";

import FunctorTests from "../../interfaces/Functor/index.tests";
import ApplyTests from "../../interfaces/Apply/index.tests";

describe("Identity", () => {

    describe("laws", () => {
        FunctorTests(Testee);
        ApplyTests(Testee);
    })

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

        it("traverse on Identity gives Maybe<Identity>", () => {
            const instance = new Testee(5);
            const toStringEither = (a: number): Maybe<string> => Maybe.of(String(a));
            const result = instance.traverse(toStringEither) as Maybe<Testee<string>>;

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
