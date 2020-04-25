import {expect} from "chai";

import bimap from "./index";

import Either from "../../implementations/Either";

describe("bimap", () => {


    it("left", () => {
        const either = Either.left(5);
        let counterLeft = 0;
        let counterRight = 0;
        const incLeft = (value: number) => counterLeft++;
        const incRight = (value: number) => counterRight++;
        bimap(incLeft, incRight, either);
        expect(counterLeft).to.be.equal(1);
        expect(counterRight).to.be.equal(0);
    });

    it("right", () => {
        const either = Either.right(5);
        let counterLeft = 0;
        let counterRight = 0;
        const incLeft = (value: number) => counterLeft++;
        const incRight = (value: number) => counterRight++;
        bimap(incLeft, incRight, either);
        expect(counterLeft).to.be.equal(0);
        expect(counterRight).to.be.equal(1);
    });

    it("curried left", () => {
        const either = Either.left(5);
        let counterLeft = 0;
        let counterRight = 0;
        const incLeft = (value: number) => counterLeft++;
        const incRight = (value: number) => counterRight++;
        bimap(incLeft)(incRight)(either);
        expect(counterLeft).to.be.equal(1);
        expect(counterRight).to.be.equal(0);
    });

    it("curried right", () => {
        const either = Either.right(5);
        let counterLeft = 0;
        let counterRight = 0;
        const incLeft = (value: number) => counterLeft++;
        const incRight = (value: number) => counterRight++;
        bimap(incLeft)(incRight)(either);
        expect(counterLeft).to.be.equal(0);
        expect(counterRight).to.be.equal(1);
    });

});
