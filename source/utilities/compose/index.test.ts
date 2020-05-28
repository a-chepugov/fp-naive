import {expect} from 'chai';
import compose from './index';

describe('compose', () => {

    it('delayed run', () => {
        let counter = 0;

        const fn1 = (a: any): any => counter++;
        const fn2 = (a: any): any => counter++;

        const composed = compose(fn1, fn2);
        expect(counter).to.equal(0);
        composed();
        expect(counter).to.equal(2);
    });


    it('(2 ** 2 + 2 ) * 2 = 12', () => {
        const mul2 = (a: number): number => a * 2;
        const add2 = (a: number): number => a + 2;
        const pow2 = (a: number): number => a ** 2;

        expect(compose(mul2, add2, pow2)(2)).to.equal(12);
    });

    it('transfers context', () => {
        const _this = {a: 1};

        function fn1(this: any) {
            expect(_this).to.deep.equal(this);
        }

        function fn2(this: any) {
            expect(_this).to.deep.equal(this);
        }

        return compose(fn1, fn2).call(_this);
    });

});
