import {expect} from "chai";
import accomplish from "../../utilities/accomplish";

export default (M: any, {x, i}: { x: any, i: any }) => {

    describe("Foldable", () => {

        it("", () => {
            const u = M.of(x);

            const r1 = u
                .reduce((_: any, x: any) => x, 1);

            const r2 = u
                .reduce((acc: Array<any>, x: any) => acc.concat([x]), [])
                .reduce((_: any, x: any) => x, i);

            expect(accomplish(r1)).to.be.deep.equal(accomplish(r2));
        });

    });

}
