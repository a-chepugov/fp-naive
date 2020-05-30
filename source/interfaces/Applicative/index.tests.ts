import {expect} from "chai";
import identity from "../../utilities/identity";

const compose = (f: any) => (g: any) => (x: any) => f(g(x))

export default (Testee: any) => {

    describe("Applicative", () => {

        it("identity", () => {
            const v = Testee.of(5);
            const result = Testee.of(identity).ap(v);

            expect(v).to.be.deep.equal(result);
        });

        it("homomorphism", () => {
            const x = Math.ceil(Math.random() * 100);
            const f = (a: number) => a + 2;

            const r1 = Testee.of(f).ap(Testee.of(x));
            const r2 = Testee.of(f(x));

            expect(r1).to.be.deep.equal(r2);
        });

        it("interchange", () => {
            const x = Math.ceil(Math.random() * 100);
            const f = (a: number) => a + 2;
            const v = Testee.of((a: number) => a * 3);

            const r1 = v.ap(Testee.of(x));
            const r2 = Testee.of((f: (a: number) => number) => f(x)).ap(v);

            expect(r1).to.be.deep.equal(r2);
        });

    });

}
