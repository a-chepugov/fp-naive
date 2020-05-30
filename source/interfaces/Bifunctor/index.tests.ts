import identity from "../../utilities/identity";
import {expect} from "chai";

export default (Testee: any) => {

    describe("Bifunctor", () => {

        it("identity", () => {
            const value = Math.floor(Math.random() * 100);
            const instance = Testee.of(value);
            const bimapped = instance.bimap(identity, identity);
            expect(instance).to.be.deep.equal(bimapped);
        });

        it("composition", () => {
            const random100 = () => Math.ceil(Math.random() * 100);
            const value = random100();
            const addition = random100();
            const multiplier = random100();

            const add = (a: number) => a + addition;
            const mul = (a: number) => a * multiplier;

            const instance = Testee.of(value, value);

            const composed = (a: number) => mul(add(a));

            const r1 = instance.map(composed, composed);
            const r2 = instance.map(add, add).map(mul, add);

            expect(r1).to.be.deep.equal(r2);
        });

    });

}
