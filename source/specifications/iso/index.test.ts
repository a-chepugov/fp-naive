export default (A: any, B: any, fromA: any, toA: any, assert: { equal: any }) => {

	describe("Isomorphism", () => {

		it('toA(fromA(A)) == A', () => {

			const r1 = toA(fromA(A));
			const r2 = A;

			return assert.equal(r1, r2);
		});

		it('fromA(toA(B)) == B', () => {

			const r1 = fromA(toA(B));
			const r2 = B;

			return assert.equal(r1, r2);
		});

	});

}
