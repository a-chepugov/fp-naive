import {expect} from 'chai';
import Testee from './index';
import Either from '../../implementations/Either';
import Maybe from '../../implementations/Maybe';
import random from "../../helpers/random";

describe('maybeToEither', () => {

	describe("laws", () => {

		const equal = (result1: any, result2: any) => {
			expect(result1).to.be.deep.equal(result2)
		};

		const x = random(1, 99);
		const nothing = Maybe.nothing(x);
		const just = Maybe.just(x);
		const fn = (a: number) => a ** 2;

		describe("left", () => {
			require('../../specifications/nt/index.test').default(Testee, nothing, fn, {equal});
		});
		describe("right", () => {
			require('../../specifications/nt/index.test').default(Testee, just, fn, {equal});
		});
	});

	const x = random(1, 99);

	it('Maybe.Nothing gives Either.Left', () => {
		const maybe = Maybe.nothing(x);
		const error = new Error('oops')
		const either = Testee(maybe, error);
		expect(either).to.be.instanceof(Either);
		const value = either.get();
		expect(value).to.be.deep.equal(error);

	});

	it('Maybe.Just gives Either.Right', () => {
		const maybe = Maybe.just(x);
		const either = Testee(maybe);
		expect(either).to.be.instanceof(Either);
		const value = either.get();
		expect(value).to.be.equal(x);
	});

});
