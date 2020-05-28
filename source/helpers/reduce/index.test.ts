import {expect} from "chai";

import Testee from "./index";

import List from "../../implementations/List";

describe("reduce", () => {

    it("reduce on List([1, 2, 3]) gives 6", () => {
        const instance = new List([1, 2, 3]);
        const reducer = (accumulator: number, value: number) => accumulator + value;

        const result = Testee(reducer, instance);
        expect(result).to.be.equal(6);
    });

});
