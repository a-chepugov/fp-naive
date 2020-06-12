import {expect} from 'chai';
import Testee from './index';

describe('curry', () => {

	const fn = (a: number, b: number, c: number): number => a + b + c;

	it('returns a function until collect enough arguments', () => {
		const wrapped = Testee(fn);

		expect(wrapped).to.be.instanceof(Function);
		expect(wrapped(1)).to.be.instanceof(Function);
		expect(wrapped(1, 2)).to.be.instanceof(Function);
		expect(wrapped(1)(2)).to.be.instanceof(Function);
	});

	it('invoke original function when got all arguments', () => {
		const wrapped = Testee(fn);
		expect(wrapped(1, 2, 3)).to.be.equal(6);
		expect(wrapped(1, 2)(3)).to.be.equal(6);
		expect(wrapped(1)(2, 3)).to.be.equal(6);
		expect(wrapped(1)(2)(3)).to.be.equal(6);
	});

	it('return original function result when got all arguments', () => {
		const wrapped = Testee(fn);
		expect(() => wrapped(1, 2, 3)(1)).to.throw();
		expect(() => wrapped(1, 2)(3)(1)).to.throw();
		expect(() => wrapped(1)(2, 3)(1)).to.throw();
		expect(() => wrapped(1)(2)(3)(1)).to.throw();
	});

});
