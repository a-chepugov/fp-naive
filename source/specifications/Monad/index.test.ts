export default (M: any, {x, f}: { x: any, f: any }, assert: { equal: any }) => {

	describe("Monad", () => {

		it("left identity", () => {
			const fc = (a: any) => M.of(f(a));

			const r1 = M.of(x).chain(fc);
			const r2: typeof M = fc(x);

			return assert.equal(r1, r2);
		});

		it("right identity", () => {
			const m = M.of(x);

			const r1 = m.chain(M.of);
			const r2: typeof M = m;

			return assert.equal(r1, r2);
		});

	});

}
