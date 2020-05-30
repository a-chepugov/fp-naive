import {expect} from "chai";

const randomTill100 = () => Math.ceil(Math.random() * 100);

export default (M: any) => {

    describe("Foldable", () => {

        it("", () => {
            const u = M.of(randomTill100());

            const r1 = u
                .reduce((_: number, x: number) => x, 1);

            const r2 = u
                .reduce((acc: Array<number>, x: number) => acc.concat([x]), [])
                .reduce((_: number, x: number) => x, 1);

            expect(r1).to.be.deep.equal(r2);
        });

    });

}
