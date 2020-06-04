import {expect} from "chai";

import Testee from "./index";

import Identity from "../../implementations/Identity";

describe("of", () => {

    it("use Identity to instantiate", () => {
        const result = Testee(Identity, 1);
        expect(result).to.be.instanceof(Identity);
    });

});
