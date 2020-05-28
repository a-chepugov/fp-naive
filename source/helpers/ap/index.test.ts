import {expect} from "chai";

import ap from "./index";

import Identity from "../../implementations/Identity";

describe("ap", () => {

    it("Maybe(inc) on Maybe(2) gives Maybe(3)", () => {
        const instance2 = Identity.of(2);
        const instanceInc = Identity.of((a: number) => a + 1);
        const result = ap(instanceInc, instance2) as Identity<number>;
        expect(result.get()).to.be.equal(3);
    });

});
