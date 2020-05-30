import {expect} from "chai";

export default (M: any) => {

    describe("Monad", () => {

        it("left identity", () => {
            const a = Math.floor(Math.random() * 100);

            const f = (a: number) => M.of(a + 1);

            const r1 = M.of(a).chain(f);
            const r2 = f(a);

            expect(r1).to.be.deep.equal(r2);
        });

        it("right identity", () => {
            const a = Math.floor(Math.random() * 100);

            const m = M.of(a);

            const r1 = m.chain(M.of);
            const r2 = m;

            expect(r1).to.be.deep.equal(r2);
        });

    });

}
