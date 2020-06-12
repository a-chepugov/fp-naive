import {expect} from "chai";

import Testee from "./index";
import Identity from "../Identity";
import Maybe from "../Maybe";

describe("Compose", () => {

	it("Build", () => {
		const Factory = Testee(Identity, Maybe);
		const compose = Factory.of(5);
		expect(compose.get()).to.be.instanceof(Identity);
		// @ts-ignore
		expect(compose.get().get()).to.be.instanceof(Maybe);
		// @ts-ignore
		expect(compose.get().get().get()).to.be.deep.equal(5);
	});

});
