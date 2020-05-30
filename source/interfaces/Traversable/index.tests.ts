import {expect} from "chai";

import identity from "../../utilities/identity";
import Maybe from "../../implementations/Maybe";
import Either from "../../implementations/Either";

const F = Maybe;
const G = Either;

const randomTill100 = () => Math.ceil(Math.random() * 100);

export default (M: any) => {

    describe("Traversable", () => {

        it("naturality", () => {
            const u = M.of(M.of(randomTill100()));
            const t = (a: any) => M.of(a);

            const r1 = t(u.traverse(F, identity));
            const r2 = u.traverse(G, t);

            expect(r1).to.be.deep.equal(r2);
        });

        it("identity", () => {
            const x = randomTill100();

            const u = M.of(x);

            const r1 = u.traverse(F, F.of);
            const r2 = F.of(u);

            expect(r1).to.be.deep.equal(r2);
        });

        it("composition", () => {
            const x = Math.ceil(Math.random() * 100);

            const u = M.of(F.of(G.of(x)));

            const r1 = u
                .map((x: any) => x.traverse(G, identity))
                .traverse(F, identity)
                .map((x: any) => x.traverse(G, identity))
                .traverse(F, identity)

            const r2 = u
                .traverse(F, identity)
                .map((x: any) => x.traverse(G, identity));

            expect(r1).to.be.deep.equal(r2);
        });

    });

}


