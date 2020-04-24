import {expect} from "chai";

import bimap from "./index";

import Either from "../../implementations/Either";

describe("bimap", () => {

    it("run", () => {
        const identity = Either.of(5);
        const add2AndStringify = (value: number): string => String(value + 2);
        expect(bimap(add2AndStringify, identity).value).to.be.equal('7');
    });

    it("curried run", () => {
        const identity = Either.of(5);
        const add2AndStringify = (value: number): string => String(value + 2);
        expect(bimap(add2AndStringify)(identity).value).to.be.equal('7');
    });

});
