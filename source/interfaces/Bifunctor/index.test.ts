import identity from "../../helpers/identity";

export default (M: any, {x, f, g, h, i}: { x: any, f: any, g: any, h: any, i: any }, assert: { equal: any }) => {

    describe("Bifunctor", () => {

        it("identity", () => {
            const p = M.of(x);

            const r1 = p;
            const r2 = p.bimap(identity, identity);

            return assert.equal(r1, r2);
        });

        it("composition", () => {
            const p = M.of(x, x);

            const composedLeft = (a: any) => f(g(a));
            const composedRight = (a: any) => h(i(a));

            const r1 = p.bimap(composedLeft, composedRight);
            const r2 = p.bimap(g, i).bimap(f, h);

            return assert.equal(r1, r2);
        });

    });

}
