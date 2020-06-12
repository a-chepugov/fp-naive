import {expect} from 'chai';
import Testee from './index';
import Identity from '../../implementations/Identity';
import Maybe from '../../implementations/Maybe';
import random from "../../helpers/random";

import maybeToIdentity from "../maybeToIdentity";

describe('identityToMaybe', () => {

	describe("laws", () => {

		const equal = (result1: any, result2: any) => {
			expect(result1).to.be.deep.equal(result2)
		};

		const x = random(1, 99);
		const identity = Identity.of(x);
		const just = Maybe.just(x);
		const identity0 = Identity.of(undefined);
		const nothing = Maybe.nothing(x);

		describe("identity to just", () => {
			require('../../specifications/iso/index.test').default(identity, just, Testee, maybeToIdentity, {equal});
		});

		describe("identity to nothing", () => {
			require('../../specifications/iso/index.test').default(identity0, nothing, Testee, maybeToIdentity, {equal});
		});

	});


	describe("own properties", () => {

		const x = random(1, 99);

		it('Identity null gives Maybe.Nothing', () => {
			const identity = Identity.of(null);
			const maybe = Testee(identity);
			expect(maybe).to.be.instanceof(Maybe);
			const value = maybe.getOrElse(-1);
			expect(value).to.be.deep.equal(-1);

		});

		it('Identity 5 gives Maybe.Just', () => {
			const identity = Identity.of(x);
			const maybe = Testee(identity);
			expect(maybe).to.be.instanceof(Maybe);
			const value = maybe.getOrElse(-1);
			expect(value).to.be.equal(x);
		});

	});

});
