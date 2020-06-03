import identity from "../../utilities/identity";

export default (M: any, {x, f}: {x: any, f: any}, assert: { equal: any }) => {

    describe("Applicative", () => {

        it("identity", () => {
            const v = M.of(x);

            const r1 = v;
            const r2 = M.of(identity).ap(v);

            return assert.equal(r1, r2);
        });

        it("homomorphism", () => {
            const r1 = M.of(f).ap(M.of(x));
            const r2 = M.of(f(x));

            return assert.equal(r1, r2);
        });

        it("interchange", () => {
            const v = M.of(f);

            const r1 = v.ap(M.of(x));
            const r2 = M.of((f: (a: any) => any) => f(x)).ap(v);

            return assert.equal(r1, r2);
        });

    });

}
