import identity from "../../utilities/identity";
import {expect} from "chai";

export default (Testee: any) => {

    describe("Functor", () => {

        it("identity", () => {
            const value = Math.floor(Math.random() * 100);
            const instance = Testee.of(value);
            const mapped = instance.map(identity);
            expect(mapped).to.be.instanceof(Testee);
            expect(instance).to.be.deep.equal(mapped);
        });

        it("composition", () => {
            const random100 = () => Math.ceil(Math.random() * 100);
            const value = random100();
            const addition = random100();
            const multiplier = random100();

            const add = (a: number) => a + addition;
            const mul = (a: number) => a * multiplier;

            const instance = Testee.of(value);

            const r1 = instance.map((a: number) => mul(add(a)));
            const r2 = instance.map(add).map(mul);

            expect(r1).to.be.deep.equal(r2);
        });

    });

}
