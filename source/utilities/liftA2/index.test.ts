import {expect} from "chai";

import Testee from "./index";

import Identity from "../../implementations/Identity";

describe("liftA2", () => {

    it("lifts sum on Identity(1) and Identity(2) gives Identity(3)", () => {
        const sum = (a: number) => (b: number) => a + b;
        const instance1 = Identity.of(1);
        const instance2 = Identity.of(2);
        const result = Testee(sum)(instance1)(instance2) as Identity<number>;

        expect(result).to.be.instanceof(Identity);
        expect(result.get()).to.be.equal(3);
    });

});
