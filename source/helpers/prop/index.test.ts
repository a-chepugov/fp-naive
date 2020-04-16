import {expect} from "chai";

import index from "./index";

describe("prop", () => {

    it("get numeric key", () => {
        expect(index({1: 1}, 1)).to.be.equal(1);
    });

    it("get string key", () => {
        expect(index({a: 1}, 'a')).to.be.equal(1);
    });

    it("get absent key", () => {
        expect(index({b: 1}, 'a')).to.be.equal(undefined);
    });

    it("get from string", () => {
        expect(index('abcd', 1)).to.be.equal('b');
    });

    it("get from empty string", () => {
        expect(index('', 'a')).to.be.equal(undefined);
    });

    it("get from number", () => {
        expect(index(123, 1)).to.be.equal(undefined);
    });

    it("get from 0", () => {
        expect(index(0, 'a')).to.be.equal(undefined);
    });

    it("get from undefined", () => {
        expect(index(undefined, 'a')).to.be.equal(undefined);
    });

    it("get from null", () => {
        expect(index(null, 'a')).to.be.equal(undefined);
    });

});
