import {expect} from "chai";

import Testee from "./index";

import random from "../../helpers/random";

describe("Identity", () => {

	describe("laws", () => {

		const equal = (r1: any, r2: any) => {
			expect(r1).to.be.deep.equal(r2);
		};

		const x = random(1, 99);
		const f = (a: number) => a + 2;
		const g = (a: number) => a * 3;

		const Maybe = require("../../implementations/Maybe").default;
		const Either = require("../../implementations/Either").default;

		const F = Maybe;
		const G = Either;

		require('../../specifications/Functor/index.test').default(Testee, {x, f, g}, {equal});
		require('../../specifications/Apply/index.test').default(Testee, {x, f, g}, {equal});
		require('../../specifications/Applicative/index.test').default(Testee, {x, f}, {equal});
		require('../../specifications/Chain/index.test').default(Testee, {x, f, g}, {equal});
		require('../../specifications/Monad/index.test').default(Testee, {x, f}, {equal});
		require('../../specifications/Foldable/index.test').default(Testee, {x, i: 1}, {equal});
		require('../../specifications/Traversable/index.test').default(Testee, {x, F, G}, {equal});
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
