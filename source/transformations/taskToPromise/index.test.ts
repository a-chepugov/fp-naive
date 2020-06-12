import {expect} from 'chai';
import Testee from './index';
import Task from '../../implementations/Task';

describe('taskToPromise', () => {

	it('Task.resolved to Promise', () => {
		const task = Task.resolved(42);
		return Testee(task)
			.then((response) => expect(response).to.be.equal(42));
	});

	it('Task.rejected to Promise', () => {
		const task = Task.rejected(42);
		return Testee(task)
			.then(() => {
				throw new Error();
			})
			.catch((response) => expect(response).to.be.equal(42));
	});

});
