import {expect} from 'chai';

import Testee from './index';

describe('safely', () => {

	it('exception gives Either.left', () => {
		const fn = () => {
			throw new Error('oops');
		};
		const result = Testee(fn)();
		expect(result.isLeft).to.be.true;
	});

	it('normal flow gives Either.right', () => {
		const fn = (a: number, b: number) => a + b;
		const result = Testee(fn)(1, 2);
		expect(result.isRight).to.be.true;
	});

});
