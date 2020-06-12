import {expect} from 'chai';
import Testee from './index';
import Task from '../../implementations/Task';

describe('promiseToTask', () => {

	it('Promise.resolve to Task', (done) => {
		const promise = new Promise((resolve, _reject) => setTimeout(() => resolve(42), 9));
		const task = Testee(promise);
		expect(task).to.be.instanceof(Task);

		promise
			.then((response) => {
				task.fork(() => {
				}, (value) => {
					expect(value).to.be.equal(response);
					done();
				})
			});
	});

	it('Promise.reject to Task', (done) => {
		const promise = new Promise((resolve, reject) => setTimeout(() => reject(42), 9));
		const task = Testee(promise);
		expect(task).to.be.instanceof(Task);

		promise
			.then(() => {
				throw new Error();
			})
			.catch((response) => {
				task.fork((value) => {
					expect(value).to.be.equal(response);
					done();
				}, () => {
				})
			});
	});

});
