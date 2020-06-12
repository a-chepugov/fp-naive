import {expect} from 'chai';
import Testee from './index';

describe('always', () => {

	it('always returns same result', () => {
		const saved = Testee(42);
		expect(saved()).to.equal(42);
		expect(saved(100)).to.equal(42);
	});

});
