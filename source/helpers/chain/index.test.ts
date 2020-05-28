import {expect} from "chai";

import chain from "./index";

import Maybe from "../../implementations/Maybe";

describe("chain", () => {

    it("chain inc on Maybe(5) gives Maybe(6)", () => {
        const maybe = Maybe.of(5) as Maybe<number>;
        const add2AndWrap = (value: number): Maybe<number> => Maybe.of(++value);
        const result = chain(add2AndWrap, maybe) as Maybe<number>;
        expect(result.get()).to.be.equal(6);
    });

});
