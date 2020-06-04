import {expect} from 'chai';
import Testee from './index';

describe('accomplish', () => {

    it('function passed', () => {
        const result = Testee((a: number, b: number) => a + b, 2, 3);
        expect(result).to.equal(5);
    });

    it('non function', () => {
        const result = Testee(1, 2, 3);
        expect(result).to.equal(1);
    });

});
