import {expect} from 'chai';
import seq from './index';

describe('seq', () => {

    it('run', () => {
        const add2 = (a: number) => a + 2;
        const add3 = (a: number) => a + 3;
        const run = seq(add2, add3);
        expect(run(4)).to.deep.equal([6, 7]);
    });

});
