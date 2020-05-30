import identity from "../../utilities/identity";
import {expect} from "chai";

const randomTill100 = () => Math.ceil(Math.random() * 100);

export default (M: any) => {

    describe("Bifunctor", () => {

        it("identity", () => {

            const p = M.of(randomTill100());

            const r1 = p;
            const r2 = p.bimap(identity, identity);

            expect(r1).to.be.deep.equal(r2);
        });

        it("composition", () => {
            const x = randomTill100();

            const f = (a: number) => a + 2;
            const g = (a: number) => a * 3;

            const h = (a: number) => a + 2;
            const i = (a: number) => a * 3;

            const p = M.of(x, x);

            const composedLeft = (a: number) => f(g(a));
            const composedRight = (a: number) => h(i(a));

            const r1 = p.bimap(composedLeft, composedRight);
            const r2 = p.bimap(g, i).bimap(f, h);

            expect(r1).to.be.deep.equal(r2);
        });

    });

}
