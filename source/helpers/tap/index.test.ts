import {expect} from "chai";

import tap from "./index";
import Maybe from "../../implementations/Maybe";

describe("tap", () => {

	it("interceptor result is omitted", () => {
		const interceptor = (a: number) => a + 1;

		const tap1 = tap(interceptor);
		expect(tap1(1)).to.be.equal(1);
	});

	it("can be used in chain", () => {
		let accumulator = 0;
		const tapFn = tap((a: number) => accumulator += a);

		Maybe.of(5)
			.map(tapFn);

		expect(accumulator).to.be.equal(5);
	});

});
