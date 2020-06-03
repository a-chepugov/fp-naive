import identity from "../../utilities/identity";

export default (M: any, {x, y}: { x: any, y: any}, assert: { equal: any }) => {

    describe("Filterable", () => {

        it("distributivity", () => {
            const v = M.of(x);
            const p = (x: any) => Boolean(x);
            const q = (x: any) => x > 3;

            const r1 = v.filter((x: any) => p(x) && q(x));
            const r2 = v.filter(p).filter(q);

            return assert.equal(r1, r2);
        });

        it("identity", () => {
            const v = M.of(x);

            const r1 = v.filter((_: any) => true);
            const r2: typeof M = v;

            return assert.equal(r1, r2);
        });

        it("annihilation", () => {
            const v = M.of(x);
            const w = M.of(y);

            const r1 = v.filter((_: any) => false);
            const r2 = w.filter((_: any) => false);

            return assert.equal(r1, r2);
        });

    });

}
