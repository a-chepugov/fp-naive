import {expect} from "chai";

import ap from "./index";

import Maybe from "../../implementations/Maybe";

describe("ap", () => {

    it("Maybe(inc) on Maybe(2) gives Maybe(3)", () => {
        const maybe2 = Maybe.of(2);
        const maybeInc = Maybe.of((a: number) => a + 1);
        const result = ap(maybeInc, maybe2) as Maybe<number>;
        expect(result.get()).to.be.equal(3);
    });

});
