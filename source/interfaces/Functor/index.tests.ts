import {expect} from "chai";

import identity from "../../utilities/identity";

export default (M: any, {x, f, g}: {x: any, f: any, g: any}) => {

    describe("Functor", () => {

        it("identity", () => {
            const u = M.of(x);

            const r1 = u.map(identity);
            const r2 = u;

            expect(r1).to.be.deep.equal(r2);
        });

        it("composition", () => {

            const u = M.of(x);

            const r1 = u.map((a: any) => f(g(a)));
            const r2 = u.map(g).map(f);

            expect(r1).to.be.deep.equal(r2);
        });

    });

}
