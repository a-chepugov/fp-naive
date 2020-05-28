import {expect} from "chai";

import chain from "./index";

import Maybe from "../../implementations/Maybe";

describe("chain", () => {

    it("run", () => {
        const maybe = Maybe.of(5) as Maybe<number>;
        const add2AndStringify = (value: number): Maybe<string> => Maybe.of(String(value + 2)) as Maybe<string>;
        expect(chain(add2AndStringify, maybe).get()).to.be.equal('7');
    });

});
