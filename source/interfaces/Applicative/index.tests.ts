import {expect} from "chai";
import identity from "../../utilities/identity";

export default (M: any) => {

    describe("Applicative", () => {

        it("identity", () => {
            const v = M.of(5);

            const r1 = v;
            const r2 = M.of(identity).ap(v);

            expect(r1).to.be.deep.equal(r2);
        });

        it("homomorphism", () => {
            const x = Math.ceil(Math.random() * 100);
            const f = (a: number) => a + 2;

            const r1 = M.of(f).ap(M.of(x));
            const r2 = M.of(f(x));

            expect(r1).to.be.deep.equal(r2);
        });

        it("interchange", () => {
            const x = Math.ceil(Math.random() * 100);
            const f = (a: number) => a + 2;
            const v = M.of((a: number) => a * 3);

            const r1 = v.ap(M.of(x));
            const r2 = M.of((f: (a: number) => number) => f(x)).ap(v);

            expect(r1).to.be.deep.equal(r2);
        });

    });

}
