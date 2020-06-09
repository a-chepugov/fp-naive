import {expect} from "chai";

import Testee from "./index";

import List from "../../implementations/List";

describe("concat", () => {

    it("traverse on List([1, 2, 3]) gives 6", () => {
        const instance1 = new List([1, 2, 3]);
        const instance2 = new List([4, 5, 6]);
        expect((Testee(instance1)(instance2) as List<number>).get()).to.be.deep.equal([1, 2, 3, 4, 5, 6]);
    });

});
