import {expect} from 'chai';
import Testee from './index';

import Maybe from '../../implementations/Maybe';

describe('maybe', () => {

	it('maybe on Maybe.Nothing() uses first argument as fallback value', () => {
		let counter = 0;
		const incJust = (a: number) => counter += a;

		const result = Testee(3, incJust)(Maybe.nothing(2));
		expect(result).to.be.equal(3);
		expect(counter).to.be.equal(0);
	});

	it('maybe on Maybe.Just(2) uses second argument', () => {
		let counter = 0;
		const incJust = (a: number) => counter += a;

		const result = Testee(3, incJust)(Maybe.just(2));
		expect(result).to.be.equal(2);
		expect(counter).to.be.equal(2);
	});

	it('maybe on non Maybe object throws', () => {
		let counter = 0;
		const incJust = (a: number) => counter += a;

		// @ts-ignore
		const action = () => Testee(3, incJust)({});
		expect(action).to.throw();

	});

});
