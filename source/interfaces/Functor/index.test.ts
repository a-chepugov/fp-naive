import {expect} from "chai";

import identity from "../../utilities/identity";
import accomplish from "../../utilities/accomplish";

export default (M: any, {x, f, g}: {x: any, f: any, g: any}) => {

    describe("Functor", () => {

        it("identity", () => {
            const u = M.of(x);

            const r1 = u.map(identity);
            const r2 = u;

            expect(accomplish(r1.get())).to.be.deep.equal(accomplish(r2.get()));
        });

        it("composition", () => {

            const u = M.of(x);

            const r1 = u.map((a: any) => f(g(a)));
            const r2 = u.map(g).map(f);

            expect(accomplish(r1.get())).to.be.deep.equal(accomplish(r2.get()));
        });

    });

}
