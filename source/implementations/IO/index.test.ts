import {expect} from "chai";

import Testee from "./index";

import random from "../../helpers/random";

describe("IO", () => {

    describe("laws", () => {
        const equal = (r1: any, r2: any) => {
            expect(r1.get()()).to.be.deep.equal(r2.get()());
        };

        const x = random(1, 99);
        const f = (a: number) => a ** 2;
        const g = (a: number) => a * 3;

        require('../../specifications/Functor/index.test').default(Testee, {x, f, g}, {equal});
        require('../../specifications/Apply/index.test').default(Testee, {x, f, g}, {equal});
        require('../../specifications/Applicative/index.test').default(Testee, {x, f}, {equal});
        require('../../specifications/Chain/index.test').default(Testee, {x, f, g}, {equal});
        require('../../specifications/Monad/index.test').default(Testee, {x, f}, {equal});
    });

    describe("Functor", () => {

        it("map doesn't invoke original function", () => {
            let counter = 0;
            const inc = () => counter++;

            const instance = new Testee(inc);
            expect(counter).to.be.equal(0);

            const mapped = instance.map((a: number) => a ** 2);
            expect(counter).to.be.equal(0);

            mapped.run();
            expect(counter).to.be.equal(1);
        })

    });

    describe("Apply", () => {

        it("ap doesn't invoke functions", () => {
            let counter = 0;
            const sum = () => {
                counter++;
                return (): void => undefined;
            };
            const instanceSum = new Testee(sum);
            const instance = new Testee(() => counter++);
            expect(counter).to.be.equal(0);

            const apped = instanceSum.ap(instance);
            expect(counter).to.be.equal(0);

            apped.run();
            expect(counter).to.be.equal(2);
        });

        it("ap takes argument from function result", () => {
            const sum = () => (a: any) => a ** 2;
            const instanceSum = new Testee(sum);

            const instance = new Testee(() => 2);

            const apped = instanceSum.ap(instance);
            expect(apped.run()).to.be.equal(4);
        });


    });

    describe("Chain", () => {

        it("chain doesn't invoke original function", () => {
            let counter = 0;
            const inc = () => counter++;

            const instance = new Testee(inc);

            const fc = (x: any) => Testee.of(x);

            let chained = instance.chain(fc);
            expect(counter).to.be.equal(0);

            chained.run();
            expect(counter).to.be.equal(1);
        });

    });

    it("join invokes internal IO", () => {
        const instance = Testee.of(new Testee(() => 3));
        expect(instance.join()).to.be.instanceof(Testee);
        expect(instance.join().get()()).to.be.equal(3);
    });

});
