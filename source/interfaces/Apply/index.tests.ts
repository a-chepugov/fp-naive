import {expect} from "chai";

import identity from "../../utilities/identity";

const compose = (f: any) => (g: any) => (x: any) => f(g(x));

export default (M: any, {x, f, g}: {x: any, f: any, g: any}) => {

    describe("Apply", () => {

        it("identity", () => {
            const v = M.of(x);

            const r1 = v;
            const r2 = M.of(identity).ap(v);

            expect(r1).to.be.deep.equal(r2);
        });

        it("homomorphism", () => {
            const r1 = M.of(f).ap(M.of(x));
            const r2 = M.of(f(x));

            expect(r1).to.be.deep.equal(r2);
        });

        it("interchange", () => {
            const v = M.of(f);

            const r1 = v.ap(M.of(x));
            const r2 = M.of((f: (a: any) => any) => f(x)).ap(v);

            expect(r1).to.be.deep.equal(r2);
        });

        it("composition", () => {
            const u = M.of(f);
            const v = M.of(g);
            const w = M.of(x);

            const r2 = M.of(compose).ap(u).ap(v).ap(w);
            const r1 = u.ap(v.ap(w));

            expect(r1).to.be.deep.equal(r2);
        });

    });

}
