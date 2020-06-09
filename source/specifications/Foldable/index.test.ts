export default (M: any, {x, i}: { x: any, i: any }, assert: { equal: any }) => {

    describe("Foldable", () => {

        it("", () => {
            const u = M.of(x);

            const r1 = u
                .reduce((_: any, x: any) => x, 1);

            const r2 = u
                .reduce((acc: Array<any>, x: any) => acc.concat([x]), [])
                .reduce((_: any, x: any) => x, i);

            return assert.equal(r1, r2);
        });

    });

}
