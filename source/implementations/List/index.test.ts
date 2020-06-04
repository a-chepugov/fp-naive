import {expect} from "chai";

import Testee from "./index";

import random from "../../helpers/random";

const equal = (r1: any, r2: any) => {
    expect(r1).to.be.deep.equal(r2);
};

describe("List", () => {

    const x = random(0, 100);
    const y = random(0, 100);
    const z = random(0, 100);
    const f = (a: number) => a + 2;
    const g = (a: number) => a * 3;
    const p = (x: any) => Boolean(x);
    const q = (x: any) => x > 3;

    const Identity = require("../../implementations/Identity").default;
    const Maybe = require("../../implementations/Maybe").default;

    const F = Identity;
    const G = Maybe;

    describe("laws", () => {
        require('../../interfaces/Functor/index.test').default(Testee, {x, f, g}, {equal});
        require('../../interfaces/Apply/index.test').default(Testee, {x, f, g}, {equal});
        require('../../interfaces/Applicative/index.test').default(Testee, {x, f}, {equal});
        require('../../interfaces/Foldable/index.test').default(Testee, {x, i: 1}, {equal});
        require('../../interfaces/Traversable/index.test').default(Testee, {x, F, G}, {equal});
        require('../../interfaces/Filterable/index.test').default(Testee, {x, y, p, q}, {equal});
        require('../../interfaces/Semigroup/index.test').default(Testee, {x, y, z}, {equal});
        require('../../interfaces/Monoid/index.test').default(Testee, {x}, {equal});
    });

    describe("Filterable", () => {

        it("filter on List(1) gives List(1)", () => {
            const instance = Testee.of(1);
            const filtrator = (value: number): Boolean => Boolean(value);

            const result = instance.filter(filtrator);
            expect(result.get()).to.be.deep.equal([1]);
        });

        it("filter on List(0, 1, 2) gives List(1, 2)", () => {
            const instance = new Testee([0, 1, 2]);
            const filtrator = (value: number): Boolean => Boolean(value);

            const result = instance.filter(filtrator);
            expect(result.get()).to.be.deep.equal([1, 2]);
        });

    });

    it("get", () => {
        const instance = Testee.of(5);
        expect(instance.get()).to.be.deep.equal([5]);
    });

});
