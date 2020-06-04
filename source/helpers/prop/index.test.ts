import {expect} from "chai";

import index from "./index";

describe("prop", () => {

    it("get numeric key returns value", () => {
        expect(index(1)({1: 1})).to.be.equal(1);
    });

    it("get string key returns value", () => {
        expect(index('a')({a: 1})).to.be.equal(1);
    });

    it("get absent key returns undefined", () => {
        expect(index('a')({b: 1})).to.be.equal(undefined);
    });

    it("get from string returns value", () => {
        expect(index(1)('abcd')).to.be.equal('b');
    });

    it("get from empty string returns undefined", () => {
        expect(index('a')('')).to.be.equal(undefined);
    });

    it("get from number returns undefined", () => {
        expect(index(1)(123)).to.be.equal(undefined);
    });

    it("get from 0 returns undefined", () => {
        expect(index('a')(0)).to.be.equal(undefined);
    });

    it("get from undefined returns undefined", () => {
        expect(index('a')(undefined)).to.be.equal(undefined);
    });

    it("get from null returns undefined", () => {
        expect(index('a')(null)).to.be.equal(undefined);
    });

});
