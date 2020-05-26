import {expect} from "chai";

import Testee from "./index";

import FunctorTest from "../../interfaces/Functor/index.test";

describe("Identity", () => {

    it("of", () => {
        const instance = Testee.of(5);
        expect(instance.get()).to.be.equal(5);
    });

    FunctorTest(Testee);
});
