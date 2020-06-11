import {expect} from "chai";

import Testee from "./index";

import random from "../../helpers/random";
import Identity from "../../implementations/Identity";
import Maybe from "../../implementations/Maybe";

describe("Intersection", () => {

    describe("laws", () => {
        const equal = (r1: any, r2: any) => {
            expect(r1).to.be.deep.equal(r2);
        };

        const x = random(1, 99);
        const y = random(1, 99);
        const z = random(1, 99);
        const f = (a: number) => a + 2;
        const g = (a: number) => a * 3;
        const p = (x: any) => Boolean(x);
        const q = (x: any) => x > 3;

        const F = Identity;
        const G = Maybe;

        require('../../specifications/Functor/index.test').default(Testee, {x, f, g}, {equal});
        require('../../specifications/Apply/index.test').default(Testee, {x, f, g}, {equal});
        require('../../specifications/Applicative/index.test').default(Testee, {x, f}, {equal});
        require('../../specifications/Foldable/index.test').default(Testee, {x, i: 1}, {equal});
        require('../../specifications/Traversable/index.test').default(Testee, {x, F, G}, {equal});
        require('../../specifications/Filterable/index.test').default(Testee, {x, y, p, q}, {equal});
        require('../../specifications/Semigroup/index.test').default(Testee, {x, y, z}, {equal});
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

    describe("Semigroup", () => {

        it("concat of two Intersections gives Intersection of common items ", () => {
            const instance1 = new Testee([1, 2, 3]);
            const instance2 = new Testee([2, 3, 4]);
            expect(instance1.concat(instance2).get()).to.be.deep.equal([2, 3]);
        });

    });

    it("get", () => {
        const instance = Testee.of(5);
        expect(instance.get()).to.be.deep.equal([5]);
    });

    it("empty", () => {
        const instance = Testee.empty();
        expect(instance.get()).to.be.deep.equal([]);
    });

    it("inspect", () => {
        const instance = new Testee((new Set([1, 2, 3])));
        expect(instance.inspect()).to.be.deep.equal('Intersection{ 1, 2, 3 }');
    });

});
