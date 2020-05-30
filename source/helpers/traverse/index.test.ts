import {expect} from "chai";

import Testee from "./index";

import Identity from "../../implementations/Identity";
import List from "../../implementations/List";

describe("traverse", () => {

    it("traverse on List([1, 2, 3]) gives 6", () => {
        const instance = new List([1, 2, 3]);
        const traverser = (value: number) => Identity.of(value * 2);
        const result = Testee(Identity, traverser, instance) as Identity<List<number>>;
        expect(result.get().get()).to.be.deep.equal([2, 4, 6]);
    });

});
