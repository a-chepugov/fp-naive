import {expect} from "chai";

export default (M: any) => {

    describe("Semigroup", () => {

        it("associativity", () => {
            const randomTill100 = () => Math.ceil(Math.random() * 100);

            const a = M.of(randomTill100());
            const b = M.of(randomTill100());
            const c = M.of(randomTill100());

            const r1 = a.concat(b).concat(c);
            const r2 = a.concat(b.concat(c));

            expect(r1).to.be.deep.equal(r2);
        });

    });

}
