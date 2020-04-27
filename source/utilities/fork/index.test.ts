import {expect} from 'chai';
import fork from './index';

describe('fork', () => {

    it('run', () => {
        const add = (a: number, b: number) => a + b;
        const mul2 = (a: number) => a * 2;
        const mul3 = (a: number) => a * 3;
        const run = fork(add, mul2, mul3);
        expect(run(2)).to.equal(10);
    });

});
