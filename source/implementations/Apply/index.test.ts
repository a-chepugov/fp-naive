import {expect} from "chai";

import Apply from "./index";

describe("Apply", () => {

    it("of", () => {
        const instance = Apply.of(5);
        // @ts-ignore
        expect(instance.get()).to.be.equal(5);
    });


    it("map", () => {
        const instance = new Apply(5);
        // @ts-ignore
        expect(instance.map((a: number) => String(a)).get()).to.be.equal('5');
    });

    it("ap", () => {
        const apply5 = new Apply(2);
        const applyToString = new Apply((value: number) => 4 + String(value));
        // @ts-ignore
        expect(apply5.ap(applyToString).get()).to.be.equal('42');
    });

});
