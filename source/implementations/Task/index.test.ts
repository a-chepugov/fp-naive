import {expect} from "chai";

import Testee from "./index";

import random from "../../helpers/random";
import taskToPromise from "../../transformations/taskToPromise";

describe("Task", () => {

    describe("laws", () => {
        const equal = (result1: any, result2: any) => {
            const promise1 = taskToPromise(result1);
            const promise2 = taskToPromise(result2);

            return Promise.all([promise1, promise2])
                .catch((error) => [error])
                .then(([response1, response2]) => {
                    expect(response1).to.be.deep.equal(response2)
                })
        };

        const x = random(1, 99);
        const y = random(1, 99);
        const f = (a: number) => a ** 2;
        const g = (a: number) => a * 3;
        const h = (a: number) => a + 4;
        const i = (a: number) => a - 5;

        require('../../specifications/Functor/index.test').default(Testee, {x, f, g}, {equal});
        require('../../specifications/Apply/index.test').default(Testee, {x, f, g}, {equal});
        require('../../specifications/Applicative/index.test').default(Testee, {x, f}, {equal});
        require('../../specifications/Chain/index.test').default(Testee, {x, f, g}, {equal});
        require('../../specifications/Monad/index.test').default(Testee, {x, f}, {equal});
        require('../../specifications/Bifunctor/index.test').default(Testee, {x, y, f, g, h, i}, {equal});
    });

    const x = random(1, 99);

    describe("Functor", () => {

        it("map doesn't invoke original function", () => {
            let counter = 0;
            const inc = () => counter++;
            const instance = new Testee((_reject: any, _resolve: any) => _resolve(inc()));
            expect(counter).to.be.equal(0);
            const mapped = instance.map((a: number) => a ** 2);
            expect(counter).to.be.equal(0);

            return taskToPromise(mapped)
                .then(() => {
                    expect(counter).to.be.equal(1);
                })
        })

    });

    describe("Apply", () => {

        it("ap doesn't invoke functions", () => {
            let counter = 0;
            const sum = () => {
                counter++;
                return (): void => undefined;
            };
            const instanceSum = Testee.of(sum);
            const instance = new Testee((_reject: any, _resolve: any) => _resolve(counter++));
            expect(counter).to.be.equal(0);

            const apped = instanceSum.ap(instance);
            expect(counter).to.be.equal(0);

            return taskToPromise(apped)
                .then(() => {
                    expect(counter).to.be.equal(2);
                })

        });

        it("ap takes argument from function result", () => {
            const mul2 = (a: any) => a * 2;
            const instanceSum = Testee.of(mul2);
            const instance = Testee.of(2);
            const apped = instanceSum.ap(instance);

            return taskToPromise(apped)
                .then((response) => {
                    expect(response).to.be.equal(4);
                })

        });

    });

    describe("Chain", () => {

        it("chain doesn't invoke original function", () => {
            let counter = 0;
            const inc = () => counter++;

            const instance = new Testee((_reject, resolve) => resolve(inc()));

            const fc = (x: any) => Testee.of(x);

            let chained = instance.chain(fc);
            expect(counter).to.be.equal(0);


            chained.fork((_a: any) => undefined, (_a: any) => undefined);
            expect(counter).to.be.equal(1);
        });

    });


    it("join invokes internal Task", () => {
        const instance = Testee.of(new Testee((_reject, resolve) => resolve(3)));
        const internal = instance.join();
        expect(internal).to.be.instanceof(Testee);

        return taskToPromise(internal)
            .then((response) => {
                expect(response).to.be.equal(3);
            })
    });

    it("reject callback returns Task.Rejected", () => {
        new Testee((reject: any, _resolve: any) => {
            let result = reject();
            expect(result).to.be.instanceof(Testee);
        });
    });

    it("resolve callback returns Task.Resolved", () => {
        new Testee((_reject: any, resolve: any) => {
            let result = resolve();
            expect(result).to.be.instanceof(Testee);
        });
    });

    it("fork returns Task function result", () => {
        const instance = new Testee((_reject: any, _resolve: any) => {
            return x;
        });

        const result = instance.fork((_a: any) => undefined, (_a: any) => undefined);
        expect(result).to.be.deep.equal(x);
    });

    it("fork return Task instance if internal Task function returns results of reject or resolve function", () => {
        let counterLeft = 0;
        let counterRight = 0;

        const incLeft = () => counterLeft++;
        const incRight = () => counterRight++;

        const instance = new Testee((_reject: any, _resolve: any) => _resolve());

        instance
            .fork(incLeft, incRight)
            .fork(incLeft, incRight);

        expect(counterLeft).to.be.deep.equal(0);
        expect(counterRight).to.be.deep.equal(2);
    });

    it("isResolved, isRejected", () => {
        const instance0 = Testee.rejected(x);
        expect(instance0.isRejected).to.be.true;
        expect(instance0.isResolved).to.be.false;

        const instance1 = Testee.resolved(x);
        expect(instance1.isResolved).to.be.true;
        expect(instance1.isRejected).to.be.false;

        const instance = new Testee((_, resolved) => resolved(x));
        expect(instance.isRejected).to.be.false;
        expect(instance.isRejected).to.be.false;

        return taskToPromise(instance)
            .then(() => {
                expect(instance.isResolved).to.be.true;
                expect(instance.isRejected).to.be.false;
            })
    });

});
