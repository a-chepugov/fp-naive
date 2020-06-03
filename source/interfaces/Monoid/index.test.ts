export default (M: any, {x}: { x: any }, assert: { equal: any }) => {

    describe("Monoid", () => {

        it("right identity", () => {
            const m = M.of(x);

            const r1 = m.concat(M.empty());
            const r2 = m;

            return assert.equal(r1, r2);
        });

        it("left identity", () => {
            const m = M.of(x);

            const r1 = M.empty().concat(m);
            const r2 = m;

            return assert.equal(r1, r2);
        });

    });

}
