import identity from "../../helpers/identity";

export default (M: any, {x, f, g}: { x: any, f: any, g: any }, assert: { equal: any }) => {

    describe("Functor", () => {

        it("identity", () => {
            const u = M.of(x);

            const r1 = u.map(identity);
            const r2: typeof M = u;

            return assert.equal(r1, r2);
        });

        it("composition", () => {

            const u = M.of(x);

            const r1 = u.map((a: any) => f(g(a)));
            const r2 = u.map(g).map(f);

            return assert.equal(r1, r2);
        });

    });

}
