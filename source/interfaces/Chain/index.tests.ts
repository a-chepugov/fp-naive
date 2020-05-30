import {expect} from "chai";

export default (M: any) => {

    describe("Chain", () => {

        it("associativity", () => {
            const x = Math.ceil(Math.random() * 100);

            const f = (a: number) => M.of(a + 2);
            const g = (a: number) => M.of(a * 3);

            const m = M.of(x);

            const r1 = m.chain(f).chain(g);
            const r2 = m.chain((x: number) => f(x).chain(g));

            expect(r1).to.be.deep.equal(r2);
        });

    });

}
