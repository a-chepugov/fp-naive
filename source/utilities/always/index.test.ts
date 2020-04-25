import {expect} from 'chai';
import always from './index';

describe('always', () => {

    it('run', () => {
        const saved = always(42);
        expect(saved()).to.equal(42);
        expect(saved(100)).to.equal(42);
    });

});
