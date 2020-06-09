import {expect} from "chai";

import Testee from "./index";

import Maybe from "../../implementations/Maybe";

describe("filter", () => {

    it("filter on Maybe.Just(1) gives Maybe.Just(1)", () => {
        const maybe = Maybe.just(1);
        const filtrator = (value: number): Boolean => Boolean(value);

        const result = Testee(filtrator)(maybe) as Maybe<number>;
        expect(result.isJust).to.be.true;
    });

    it("filter on Maybe.Just(0) gives Maybe.Nothing", () => {
        const maybe = Maybe.just(0);
        const filtrator = (value: number): Boolean => Boolean(value);

        const result = Testee(filtrator)(maybe) as Maybe<number>;
        expect(result.isNothing).to.be.true;
    });

    it("filter on Maybe.Nothing gives Maybe.Nothing", () => {
        const maybe = Maybe.nothing(1);
        const filtrator = (value: number): Boolean => Boolean(value);

        const result = Testee(filtrator)(maybe) as Maybe<number>;
        expect(result.isNothing).to.be.true;
    });

});
