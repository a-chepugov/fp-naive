import {expect} from "chai";

import Testee from "./index";

import identity from "../../utilities/identity";

describe("Identity", () => {

    it("of", () => {
        const instance = Testee.of(5);
        expect(instance.get()).to.be.equal(5);
    });

    describe("Functor", () => {

        it("identity", () => {
            const value = Math.floor(Math.random() * 100);
            const instance = new Testee(value);
            expect(instance.map(identity).get()).to.be.equal(value);
        });

        it("composition", () => {
            const value = Math.floor(Math.random() * 100);
            const addition = Math.floor(Math.random() * 100);
            const multiplier = Math.floor(Math.random() * 100);

            const add = (a: number) => a + addition;
            const mul = (a: number) => a + multiplier;

            const instance = new Testee(value);
            expect(instance.map((a: number) => mul(add(a))).get()).to.be.equal(instance.map(add).map(mul).get());
        });

    });

});
