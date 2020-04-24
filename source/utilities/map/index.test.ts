import {expect} from "chai";

import map from "./index";

import Identity from "../../implementations/Identity";

describe("map", () => {

    it("run", () => {
        const identity = Identity.of(5);
        const add2AndStringify = (value: number): string => String(value + 2);
        expect(map(add2AndStringify, identity).value).to.be.equal('7');
    });

    it("curried run", () => {
        const identity = Identity.of(5);
        const add2AndStringify = (value: number): string => String(value + 2);
        expect(map(add2AndStringify)(identity).value).to.be.equal('7');
    });

});
