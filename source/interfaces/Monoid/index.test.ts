import {expect} from "chai";

export default (M: any, {x}: { x: any }) => {

    describe("Monoid", () => {

        it("right identity", () => {
            const m = M.of(x);

            const r1 = m.concat(M.empty());
            const r2 = m;

            expect(r1).to.be.deep.equal(r2);
        });

        it("left identity", () => {
            const m = M.of(x);

            const r1 = M.empty().concat(m);
            const r2 = m;

            expect(r1).to.be.deep.equal(r2);
        });

    });

}
