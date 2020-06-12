import {expect} from 'chai';
import Testee from './index';
import Either from '../../implementations/Either';
import Maybe from '../../implementations/Maybe';
import random from "../../helpers/random";

describe('eitherToMaybe', () => {

	describe("laws", () => {

		const equal = (result1: any, result2: any) => {
			expect(result1).to.be.deep.equal(result2)
		};

		const x = random(1, 99);
		const left = Either.left(x);
		const right = Either.right(x);
		const fn = (a: number) => a ** 2;

		describe("left", () => {
			require('../../specifications/nt/index.test').default(Testee, left, fn, {equal});
		});
		describe("right", () => {
			require('../../specifications/nt/index.test').default(Testee, right, fn, {equal});
		});
	});

	const x = random(1, 99);

	it('Either.Left gives Maybe.Nothing', () => {
		const either = Either.left(x);
		const maybe = Testee(either);
		expect(maybe).to.be.instanceof(Maybe);
		const value = maybe.getOrElse(-1);
		expect(value).to.be.deep.equal(-1);

	});

	it('Either.Right gives Maybe.Just', () => {
		const either = Either.right(x);
		const maybe = Testee(either);
		expect(maybe).to.be.instanceof(Maybe);
		const value = maybe.getOrElse(-1);
		expect(value).to.be.equal(x);
	});

});
