const compose = (f: any) => (g: any) => (x: any) => f(g(x));

export default (M: any, {x, f, g}: {x: any, f: any, g: any}, assert: { equal: any }) => {

    describe("Apply", () => {

        it("composition", () => {
            const u = M.of(f);
            const v = M.of(g);
            const w = M.of(x);

            const r2 = M.of(compose).ap(u).ap(v).ap(w);
            const r1 = u.ap(v.ap(w));

            return assert.equal(r1, r2);
        });

    });

}
