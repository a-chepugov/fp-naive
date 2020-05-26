import {expect} from "chai";

import Maybe from "../../implementations/Maybe";

import Testee from "./index";

describe("lift", () => {

    it("lift increment on 1 gives Maybe(2)", () => {
        const inc = (a: number) => a + 1;
        const liftedInc = Testee(inc);
        const result = liftedInc(1);

        expect(result).to.be.instanceof(Maybe);
        expect(result.getOrElse(0)).to.be.equal(2);
    });

});
