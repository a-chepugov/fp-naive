import {expect} from "chai";
import accomplish from "../../utilities/accomplish";

export default (M: any, {x, f}: { x: any, f: any }) => {

    describe("Monad", () => {

        it("left identity", () => {
            const fc = (a: any) => M.of(f(a));

            const r1 = M.of(x).chain(fc);
            const r2 = fc(x);

            expect(accomplish(r1.get())).to.be.deep.equal(accomplish(r2.get()));
        });

        it("right identity", () => {
            const m = M.of(x);

            const r1 = m.chain(M.of);
            const r2 = m;

            expect(accomplish(r1.get())).to.be.deep.equal(accomplish(r2.get()));
        });

    });

}
