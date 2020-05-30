import identity from "../../utilities/identity";
import {expect} from "chai";

export default (M: any) => {

    describe("Filterable", () => {

        it("distributivity", () => {
            const v = M.of(5);
            const p = (x: number) => Boolean(x);
            const q = (x: number) => x > 3;

            const r1 = v.filter((x: number) => p(x) && q(x));
            const r2 = v.filter(p).filter(q);

            expect(r1).to.be.deep.equal(r2);
        });

        it("identity", () => {
            const v = M.of(5);

            const r1 = v.filter((_: any) => true);
            const r2 = v;

            expect(r1).to.be.deep.equal(r2);
        });

        it("annihilation", () => {
            const v = M.of(5);
            const w = M.of(6);

            const r1 = v.filter((_: any) => false);
            const r2 = w.filter((_: any) => false);

            expect(r1).to.be.deep.equal(r2);
        });

    });

}
