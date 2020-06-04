import {expect} from "chai";

import map from "./index";

import Identity from "../../implementations/Identity";

describe("map", () => {

    it("run", () => {
        const identity = Identity.of(5);
        const add2AndStringify = (value: number): string => String(value + 2);
        const result = map(add2AndStringify, identity) as Identity<any>;
        expect(result.get()).to.be.equal('7');
    });

});
