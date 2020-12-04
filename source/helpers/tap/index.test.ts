import {expect} from "chai";

import tap from "./index";
import Maybe from "../../implementations/Maybe";

describe("tap", () => {

	it("interceptor result is omitted", () => {
		const interceptor = (a: number) => a + 1;

		const tapped = tap(interceptor);
		expect(tapped(1)).to.be.equal(1);
	});

	it("can be used in chain", () => {
		let accumulator = 0;

		Maybe.of(5)
			.map(tap((a: number) => accumulator += a));

		expect(accumulator).to.be.equal(5);
	});

});
