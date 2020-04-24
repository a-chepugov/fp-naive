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
        const mapped = instance.map((a: number) => String(a));
        // @ts-ignore
        expect(mapped.get()).to.be.equal('5');
    });

});
