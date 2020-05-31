import {expect} from 'chai';
import testee from './index';

describe('random', () => {

	describe('valid ranges', () => {

		it('defaults',
			() => expect(testee()).to.be.gte(0).to.lt(1));

		it('random(2, 3) gives 2 or 3', () =>
			() => expect(testee(2, 3)).to.be.gte(2).to.lt(3));

		it('random(5, 5) gives 5', () =>
			() => expect(testee(5, 5)).to.be.equal(5));

	});

	describe('invalid', () => {

		it('first',
			() => expect(testee(NaN, 1)).to.be.deep.equal(NaN));

		it('second',
			() => expect(testee(0, NaN)).to.be.deep.equal(NaN));

	});

});
