import {expect} from "chai";

import Index from "./index";

describe("Identity", () => {

    it("of", () => {
        const instance = Index.of(5);
        // @ts-ignore
        expect(instance.get()).to.be.equal(5);
    });


    it("map", () => {
        const instance = new Index(5);
        // @ts-ignore
        expect(instance.map((a: number) => String(a)).get()).to.be.equal('5');
    });

});
