import {expect} from "chai";

import chain from "./index";

import Identity from "../../implementations/Identity";

describe("chain", () => {

    it("chain inc on Maybe(5) gives Maybe(6)", () => {
        const instance = Identity.of(5) as Identity<number>;
        const add2AndWrap = (value: number): Identity<number> => Identity.of(++value);
        const result = chain(add2AndWrap)(instance) as Identity<number>;
        expect(result.get()).to.be.equal(6);
    });

});
