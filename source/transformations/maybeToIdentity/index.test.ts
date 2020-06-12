import {expect} from 'chai';
import Testee from './index';
import Identity from '../../implementations/Identity';
import Maybe from '../../implementations/Maybe';
import random from "../../helpers/random";

import identityToMaybe from "../identityToMaybe";

describe('maybeToIdentity', () => {

	describe("laws", () => {

		const equal = (result1: any, result2: any) => {
			expect(result1).to.be.deep.equal(result2)
		};

		const x = random(1, 99);
		const identity = Identity.of(x);
		const just = Maybe.just(x);
		const identity0 = Identity.of(undefined);
		const nothing = Maybe.nothing(x);

		describe("just to identity", () => {
			require('../../specifications/iso/index.test').default(just, identity, Testee, identityToMaybe, {equal});
		});

		describe("nothing to identity", () => {
			require('../../specifications/iso/index.test').default(nothing, identity0, Testee, identityToMaybe, {equal});
		});
	});

	describe("own properties", () => {

		const x = random(1, 99);

		it('Maybe.Nothing gives Identity', () => {
			const maybe = Maybe.nothing(x);
			const either = Testee(maybe);
			expect(either).to.be.instanceof(Identity);
			const value = either.get();
			expect(value).to.be.deep.equal(undefined);

		});

		it('Maybe.Just gives Identity', () => {
			const maybe = Maybe.just(x);
			const either = Testee(maybe);
			expect(either).to.be.instanceof(Identity);
			const value = either.get();
			expect(value).to.be.equal(x);
		});

	});

});
