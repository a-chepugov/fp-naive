import identity from "../../utilities/identity";
import {expect} from "chai";

const randomTill100 = () => Math.ceil(Math.random() * 100);

export default (M: any) => {

    describe("Functor", () => {

        it("identity", () => {
            const x = randomTill100();

            const u = M.of(x);

            const r1 = u.map(identity);
            const r2 = u;

            expect(r1).to.be.deep.equal(r2);
        });

        it("composition", () => {
            const x = randomTill100();

            const f = (a: number) => a + 2;
            const g = (a: number) => a * 3;

            const u = M.of(x);

            const r1 = u.map((a: number) => f(g(a)));
            const r2 = u.map(g).map(f);

            expect(r1).to.be.deep.equal(r2);
        });

    });

}
