import {expect} from "chai";

import ap from "./index";

import Maybe from "../../implementations/Maybe";

describe("ap", () => {

    it("run", () => {
        const maybe2 = Maybe.of(2);
        const maybeInc = Maybe.of((a: number) => a + 1);
        expect(ap(maybeInc, maybe2).get()).to.be.equal(3);
    });

    it("curried run", () => {
        const maybe2 = Maybe.of(2);
        const maybeInc = Maybe.of((a: number) => a + 1);
        expect(ap(maybeInc)(maybe2).get()).to.be.equal(3);
    });

});
