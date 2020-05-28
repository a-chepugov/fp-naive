import {expect} from 'chai';
import pipe from './index';

describe('pipe', () => {

    it('delays run until returned function invoke', () => {
        let counter = 0;

        const fn1 = (a: any): any => ++counter;
        const fn2 = (a: any): any => ++counter;

        const piped = pipe(fn1, fn2);
        expect(counter).to.equal(0);
        piped();
        expect(counter).to.equal(2);
    });

    it('(2 * 2 + 2 ) ** 2 = 36', () => {
        const mul2 = (a: number): number => a * 2;
        const add2 = (a: number): number => a + 2;
        const pow2 = (a: number): number => a ** 2;

        expect(pipe(mul2, add2, pow2)(2)).to.equal(36);
    });

    it('transfers context', () => {
        const _this = {a: 1};

        function fn1(this: any) {
            expect(_this).to.deep.equal(this);
        }

        function fn2(this: any) {
            expect(_this).to.deep.equal(this);
        }

        return pipe(fn1, fn2).call(_this);
    });

});
