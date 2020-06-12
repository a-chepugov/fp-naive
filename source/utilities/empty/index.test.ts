import {expect} from "chai";

import Testee from "./index";

import List from "../../implementations/List";

describe("empty", () => {

	it("run", () => {
		const result = Testee(List);
		expect(result).to.be.instanceof(List);
	});

});
