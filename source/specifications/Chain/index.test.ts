export default (M: any, {x, f, g}: { x: any, f: any, g: any }, assert: { equal: any }) => {

	describe("Chain", () => {

		it("associativity", () => {
			const fc = (a: any) => M.of(f(a));
			const gc = (a: any) => M.of(g(a));

			const m = M.of(x);

			const r1 = m.chain(fc).chain(gc);
			const r2 = m.chain((x: any) => fc(x).chain(gc));

			return assert.equal(r1, r2);
		});

	});

}
