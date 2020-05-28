import {expect} from 'chai';
import Testee from './index';

import Either from '../../implementations/Either';

describe('either', () => {

    it('either on Either.Left(2) uses first argument', () => {
        let left = 0;
        let right = 0;
        const incLeft = (a: number) => left += a;
        const incRight = (a: number) => right += a;

        const result = Testee(incLeft, incRight, Either.left(2));
        expect(result).to.be.equal(2);
        expect(left).to.be.equal(2);
        expect(right).to.be.equal(0);
    });

    it('either on Either.Right(2) uses second argument', () => {
        let left = 0;
        let right = 0;
        const incLeft = (a: number) => left += a;
        const incRight = (a: number) => right += a;

        const result = Testee(incLeft, incRight, Either.right(2));
        expect(result).to.be.equal(2);
        expect(left).to.be.equal(0);
        expect(right).to.be.equal(2);
    });

    it('either on non Either object throws', () => {
        let left = 0;
        let right = 0;
        const incLeft = (a: number) => left += a;
        const incRight = (a: number) => right += a;

        // @ts-ignore
        const action = () => Testee(incLeft, incRight, {});
        expect(action).to.throw();

    });

});
