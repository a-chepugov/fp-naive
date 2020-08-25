import {expect} from 'chai';
import Testee from './index';
import Either from '../../implementations/Either';
import random from "../../helpers/random";

describe('eitherToPromise', () => {

	describe("own properties", () => {

		const x = random(1, 99);

		it('Either.left to Promise', () => {
			const either = Either.left(x);
			const promise = Testee(either);
			expect(promise).to.be.instanceof(Promise);

			promise
				.then(() => {
					throw new Error('Invalid path');
				})
				.catch((value) => expect(value).to.be.equal(x))
		});

		it('Either.right to Promise', () => {
			const either = Either.right(x);
			const promise = Testee(either);
			expect(promise).to.be.instanceof(Promise);

			promise.then((value) => expect(value).to.be.equal(x));
		});

	});

});
