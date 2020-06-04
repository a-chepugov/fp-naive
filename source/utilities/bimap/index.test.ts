import {expect} from "chai";

import bimap from "./index";

import Either from "../../implementations/Either";

describe("bimap", () => {

    it("bimap on Either.Left runs first argument", () => {
        const either = Either.left(5);
        let counterLeft = 0;
        let counterRight = 0;
        const incLeft = (_: number) => counterLeft++;
        const incRight = (_: number) => counterRight++;
        bimap(incLeft, incRight, either);
        expect(counterLeft).to.be.equal(1);
        expect(counterRight).to.be.equal(0);
    });

    it("bimap on Either.Right runs second argument", () => {
        const either = Either.right(5);
        let counterLeft = 0;
        let counterRight = 0;
        const incLeft = (_: number) => counterLeft++;
        const incRight = (_: number) => counterRight++;
        bimap(incLeft, incRight, either);
        expect(counterLeft).to.be.equal(0);
        expect(counterRight).to.be.equal(1);
    });

});
