export default (nt: any, x: any, fn: any, assert: { equal: any }) => {

	describe("Natural transformation", () => {

		it('morphism', () => {

			const r1 = nt(x).map(fn);
			const r2 = nt(x.map(fn));

			return assert.equal(r1, r2);
		});

	});

}
