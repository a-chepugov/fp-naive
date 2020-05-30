import {expect} from "chai";

export default (Testee: any) => {

    describe("Chain", () => {

        it("associativity", () => {
            const random100 = () => Math.ceil(Math.random() * 100);
            const value = random100();
            const addition = random100();
            const multiplier = random100();

            const f = (a: number) => Testee.of(a + addition);
            const g = (a: number) => Testee.of(a * multiplier);

            const m = Testee.of(value);

            const r1 = m.chain(f).chain(g);
            const r2 = m.chain((x: number) => f(x).chain(g));

            expect(r1).to.be.deep.equal(r2);
        });

    });

}
