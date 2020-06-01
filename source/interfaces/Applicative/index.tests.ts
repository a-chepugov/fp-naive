import {expect} from "chai";

import identity from "../../utilities/identity";
import accomplish from "../../utilities/accomplish";

export default (M: any, {x, f}: {x: any, f: any}) => {

    describe("Applicative", () => {

        it("identity", () => {
            const v = M.of(x);

            const r1 = v;
            const r2 = M.of(identity).ap(v);

            expect(accomplish(r1.get())).to.be.deep.equal(accomplish(r2.get()));
        });

        it("homomorphism", () => {
            const r1 = M.of(f).ap(M.of(x));
            const r2 = M.of(f(x));

            expect(accomplish(r1.get())).to.be.deep.equal(accomplish(r2.get()));
        });

        it("interchange", () => {
            const v = M.of(f);

            const r1 = v.ap(M.of(x));
            const r2 = M.of((f: (a: any) => any) => f(x)).ap(v);

            expect(accomplish(r1.get())).to.be.deep.equal(accomplish(r2.get()));
        });

    });

}
