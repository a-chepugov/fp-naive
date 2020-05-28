import {expect} from 'chai';
import Testee from './index';

import Maybe from '../../implementations/Maybe';

describe('maybe', () => {

    it('maybe on Maybe.Nothing() uses first argument', () => {
        let just = 0;
        const incJust = (a: number) => just += a;

        const result = Testee(3, incJust, Maybe.nothing(2));
        expect(result).to.be.equal(3);
        expect(just).to.be.equal(0);
    });

    it('maybe on Maybe.Just(2) uses second argument', () => {
        let just = 0;
        const incJust = (a: number) => just += a;

        const result = Testee(3, incJust, Maybe.just(2));
        expect(result).to.be.equal(2);
        expect(just).to.be.equal(2);
    });

    it('maybe on non Maybe object throws', () => {
        let just = 0;
        const incJust = (a: number) => just += a;

        // @ts-ignore
        const action = () => Testee(3, incJust, {});
        expect(action).to.throw();

    });

});
