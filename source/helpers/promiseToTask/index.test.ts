import {expect} from 'chai';
import Testee from './index';
import Task from '../../implementations/Task';

describe('promiseToTask', () => {

    it('Promise.resolve to Task', (done) => {
        const promise = Promise.resolve(42);
        const task = Testee(promise);
        expect(task).to.be.instanceof(Task);

        promise
            .then((response) => {
                expect(task.isResolved).to.be.true;

                task.fork(() => {
                }, (value) => {
                    expect(value).to.be.equal(response);
                    done();
                })
            });
    });

    it('Promise.reject to Task', (done) => {
        const promise = Promise.reject(42);
        const task = Testee(promise);
        expect(task).to.be.instanceof(Task);

        promise
            .then(() => {
                throw new Error();
            })
            .catch((response) => {
                expect(task.isRejected).to.be.true;

                task.fork((value) => {
                    expect(value).to.be.equal(response);
                    done();
                }, () => {
                })
            });
    });

});
