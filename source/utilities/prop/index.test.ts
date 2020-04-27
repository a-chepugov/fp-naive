import {expect} from "chai";

import index from "./index";

describe("prop", () => {

    it("get numeric key", () => {
        expect(index(1)({1: 1})).to.be.equal(1);
    });

    it("get string key", () => {
        expect(index('a')({a: 1})).to.be.equal(1);
    });

    it("get absent key", () => {
        expect(index('a')({b: 1})).to.be.equal(undefined);
    });

    it("get from string", () => {
        expect(index(1)('abcd')).to.be.equal('b');
    });

    it("get from empty string", () => {
        expect(index('a')('')).to.be.equal(undefined);
    });

    it("get from number", () => {
        expect(index(1)(123)).to.be.equal(undefined);
    });

    it("get from 0", () => {
        expect(index('a')(0)).to.be.equal(undefined);
    });

    it("get from undefined", () => {
        expect(index('a')(undefined)).to.be.equal(undefined);
    });

    it("get from null", () => {
        expect(index('a')(null)).to.be.equal(undefined);
    });

});
