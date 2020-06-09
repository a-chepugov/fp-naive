import {expect} from 'chai';
import Testee from './index';
import Either from '../../implementations/Either';
import Task from '../../implementations/Task';
import random from "../../helpers/random";
import taskToPromise from "../taskToPromise";

describe('eitherToTask', () => {

    describe("laws", () => {

        const equal = (result1: any, result2: any) => {
            const promise1 = taskToPromise(result1).catch((error) => error);
            const promise2 = taskToPromise(result2).catch((error) => error);

            return Promise.all([promise1, promise2])
                .then(([response1, response2]) => {
                    expect(response1).to.be.deep.equal(response2)
                })
        };

        const x = random(1, 99);
        const left = Either.left(x);
        const right = Either.right(x);
        const fn = (a: number) => a ** 2;

        describe("left", () => {
            require('../../specifications/nt/index.test').default(Testee, left, fn, {equal});
        });
        describe("right", () => {
            require('../../specifications/nt/index.test').default(Testee, right, fn, {equal});
        });
    });

    const x = random(1, 99);

    it('Either.left to Task', (done) => {
        const either = Either.left(x);
        const task = Testee(either);
        expect(task).to.be.instanceof(Task);

        expect(task.isRejected).to.be.true;

        task.fork((value) => {
            expect(value).to.be.equal(x);
            done();
        }, () => {
        },)

    });

    it('Either.right to Task', (done) => {
        const either = Either.right(x);
        const task = Testee(either);
        expect(task).to.be.instanceof(Task);

        expect(task.isResolved).to.be.true;

        task.fork(() => {
        }, (value) => {
            expect(value).to.be.equal(x);
            done();
        });
    });

});
