import {expect} from "chai";

import Testee from "./index";

import random from "../../utilities/random";

describe("Identity", () => {

    const x = random(0, 100);
    const f = (a: number) => a + 2;
    const g = (a: number) => a * 3;

    const Maybe = require("../../implementations/Maybe").default;
    const Either = require("../../implementations/Either").default;

    const F = Maybe;
    const G = Either;

    describe("laws", () => {
        require('../../interfaces/Functor/index.tests').default(Testee, {x, f, g});
        require('../../interfaces/Apply/index.tests').default(Testee, {x, f, g});
        require('../../interfaces/Applicative/index.tests').default(Testee, {x, f});
        require('../../interfaces/Chain/index.tests').default(Testee, {x, f, g});
        require('../../interfaces/Monad/index.tests').default(Testee, {x, f});
        require('../../interfaces/Foldable/index.tests').default(Testee, {x, i: 1});
        require('../../interfaces/Traversable/index.tests').default(Testee, {x, F, G});
    });

    it("get", () => {
        const instance = Testee.of(5);
        expect(instance.get()).to.be.equal(5);
    });

    it("join", () => {
        const instance = Testee.of(Testee.of(3));
        expect(instance.join()).to.be.instanceof(Testee);
        expect(instance.join().get()).to.be.equal(3);
    });

});
