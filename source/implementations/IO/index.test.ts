import {expect} from "chai";

import Testee from "./index";

import random from "../../utilities/random";

describe("IO", () => {

    const x = random(1, 100);
    const f = (a: any) => a ** 2;
    const g = (a: any) => a * 3;

    describe("laws", () => {
        require('../../interfaces/Functor/index.test').default(Testee, {x, f, g});
        require('../../interfaces/Apply/index.test').default(Testee, {x, f, g});
        require('../../interfaces/Applicative/index.test').default(Testee, {x, f});
        require('../../interfaces/Chain/index.test').default(Testee, {x, f, g});
        require('../../interfaces/Foldable/index.test').default(Testee, {x, i: (a: any) => a()});
    });

    describe("Functor", () => {

        it("map doesn't invoke original function", () => {
            let counter = 0;
            const inc = () => counter++;

            const instance = new Testee(inc);
            expect(counter).to.be.equal(0);

            const mapped = instance.map(f);
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
            const sum = (a: any) => (b: any) => a + b;
            const instanceSum = new Testee(sum);

            const instance = new Testee(() => 2);

            const apped = instanceSum.ap(instance);
            expect(apped.run(3)).to.be.equal(5);
        });


    });

    describe("Chain", () => {

        it("chain doesn't invoke original function", () => {
            let counter = 0;
            const inc = () => counter++;

            const instance = new Testee(inc);

            const fc = (x: any) => new Testee(x);

            let chained = instance.chain(fc);
            expect(counter).to.be.equal(0);

            chained.run();
            expect(counter).to.be.equal(1);
        });

    });

    it("run takes arguments for IO action", () => {
        const sum = (a: any, b: any, c: any) => {
            return a + b + c;
        };

        const instance = new Testee(sum);
        const result = instance.run(1, 2, 3);
        expect(result).to.be.equal(6);
    });

    it("join invokes internal IO", () => {
        const instance = Testee.of(new Testee(() => 3));
        expect(instance.join()).to.be.instanceof(Testee);
        expect(instance.join().get()()).to.be.equal(3);
    });

});
