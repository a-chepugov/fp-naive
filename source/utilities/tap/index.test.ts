import {expect} from "chai";

import tap from "./index";

describe("tap", () => {

    it("returns without modification", () => {
        const interceptor = (a: number) => a + 1;

        const tap1 = tap(interceptor);
        expect(tap1(1)).to.be.equal(1);
    });

});
