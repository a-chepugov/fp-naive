import {expect} from "chai";

import identity from "../../utilities/identity";

import {ApplicativeTypeRep} from "../Applicative";

export default (M: any, {x, F, G}: { x: any, F: ApplicativeTypeRep<any>, G: ApplicativeTypeRep<any>}) => {

    describe("Traversable", () => {

        it("naturality", () => {
            const u = M.of(M.of(x));
            const t = (a: any) => M.of(a);

            const r1 = t(u.traverse(F, identity));
            const r2 = u.traverse(G, t);

            expect(r1).to.be.deep.equal(r2);
        });

        it("identity", () => {
            const u = M.of(x);

            const r1 = u.traverse(F, F.of);
            const r2 = F.of(u);

            expect(r1).to.be.deep.equal(r2);
        });

        it("composition", () => {
            const u = M.of(F.of(G.of(x)));

            const r1 = u
                .map((x: any) => x.traverse(G, identity))
                .traverse(F, identity)
                .map((x: any) => x.traverse(G, identity))
                .traverse(F, identity);

            const r2 = u
                .traverse(F, identity)
                .map((x: any) => x.traverse(G, identity));

            expect(r1).to.be.deep.equal(r2);
        });

    });

}


