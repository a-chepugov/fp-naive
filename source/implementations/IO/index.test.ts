import {expect} from "chai";

import Testee from "./index";

import random from "../../utilities/random";

describe("IO", () => {

    const x = random(1, 100);
    const f = (a: any) => a ** 2;
    const g = (a: any) => a * 3;


    const Identity = require("../../implementations/Identity").default;
    const Maybe = require("../../implementations/Maybe").default;

    const F = Identity;
    const G = Maybe;

    describe("laws", () => {
        require('../../interfaces/Functor/index.tests').default(Testee, {x, f, g});
        require('../../interfaces/Apply/index.tests').default(Testee, {x, f, g});
        require('../../interfaces/Applicative/index.tests').default(Testee, {x, f});
        require('../../interfaces/Chain/index.tests').default(Testee, {x, f, g});
        require('../../interfaces/Foldable/index.tests').default(Testee, {x, i: (a: any) => a()});
    });

    describe("q", () => {

    it("ap", () => {
            let counter = 0;
            const x = (i: any) => {
                console.log('DEBUG:index.test.ts:28 =>');
                counter++;
                return i
            };
            const instance = new Testee(x);

            let iden = Identity.of(5)

            let q = instance.ap(iden);


        console.log('DEBUG:index.test.ts:42 =>', q.inspect());

        console.log('DEBUG:index.test.ts:46 =>', q.run());


        });


        it("map", () => {
            let counter = 0;
            const x = () => {
                console.log('DEBUG:index.test.ts:28 =>');
                counter++;
                return 33
            };

            const instance = new Testee(x);
            console.log('DEBUG:index.test.ts:64 =>', instance.inspect());
            const f = (x: any) => x * 2;

            let q = instance.map(f);
            expect(counter).to.be.equal(0);
            console.log('DEBUG:index.test.ts:38 =>', q.inspect());

            console.log('DEBUG:index.test.ts:40 => counter ', counter);

            let r = q.run();
            console.log('DEBUG:index.test.ts:43 => r', r);
            console.log('DEBUG:index.test.ts:44 => counter', counter);
            expect(counter).to.be.equal(1);
            expect(r).to.be.equal(66);
        })


        it("chain", () => {
            let counter = 0;
            const x = () => {
                console.log('DEBUG:index.test.ts:55 =>');
                counter++;
                return 33
            };

            const instance = new Testee(x);
            console.log('DEBUG:index.test.ts:64 =>', instance.inspect());
            const fc = (x: any) => {
                console.log('DEBUG:index.test.ts:63 =>', x);
                return Testee.of(x);
            };

            // let q = instance.chain(fc);
            // console.log('DEBUG:index.test.ts:68 =>', q.inspect());
            // expect(counter).to.be.equal(0);
            //
            // console.log('DEBUG:index.test.ts:71 => counter ', counter);
            //
            // let r = q.run();
            // console.log('DEBUG:index.test.ts:74 => r', r);
            // console.log('DEBUG:index.test.ts:75 => counter', counter);
            // expect(counter).to.be.equal(1);
            // expect(r).to.be.equal(33);
        });

    })


    it("join", () => {
        const instance = Testee.of(Testee.of(3));
        expect(instance.join()).to.be.instanceof(Testee);
        expect(instance.join().get()()).to.be.equal(3);
    });

});
