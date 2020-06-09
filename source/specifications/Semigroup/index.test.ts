export default (M: any, {x, y, z}: {x: any, y: any, z: any}, assert: { equal: any }) => {

    describe("Semigroup", () => {

        it("associativity", () => {
            const a = M.of(x);
            const b = M.of(y);
            const c = M.of(z);

            const r1 = a.concat(b).concat(c);
            const r2 = a.concat(b.concat(c));

            return assert.equal(r1, r2);
        });

    });

}
