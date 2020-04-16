import {expect} from 'chai';
import testee from './index';


describe('curry', () => {

    const fn = (a: number, b: number, c: number): number => a + b + c;

    describe('run', () => {

        it('type', () => {
            const wrapped = testee(fn);

            expect(wrapped).to.be.instanceof(Function);
            expect(wrapped(1)).to.be.instanceof(Function);
            expect(wrapped(1, 2)).to.be.instanceof(Function);
            expect(wrapped(1)(2)).to.be.instanceof(Function);
        });

        it('result', () => {
            const wrapped = testee(fn);
            expect(wrapped(1, 2, 3)).to.be.equal(6);
            expect(wrapped(1, 2)(3)).to.be.equal(6);
            expect(wrapped(1)(2, 3)).to.be.equal(6);
            expect(wrapped(1)(2)(3)).to.be.equal(6);
        });

    });

    describe('throw', () => {

    	it('result', () => {
    		const wrapped = testee(fn);
    		expect(() => wrapped(1, 2, 3)(1)).to.throw();
    		expect(() => wrapped(1, 2)(3)(1)).to.throw();
    		expect(() => wrapped(1)(2, 3)(1)).to.throw();
    		expect(() => wrapped(1)(2)(3)(1)).to.throw();
    	});

    });

});
