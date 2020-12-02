import {expect} from 'chai';
import Testee from './index';
import {readdir} from 'fs';

describe('taskify', () => {
	const taskify = Testee;

	it('readdir to task', (done) => {
		const readdirTask = taskify(readdir);

		return readdirTask('./')
			.fork(
				(e: any) => {
					expect(Array.isArray(e)).to.be.equal(true)
					done()
				},
				(r: any) => {
					expect(Array.isArray(r)).to.be.equal(true)
					done()
				}
			)
	});

	it('pass context to function', (done) => {
		const context = {a: 1}
		return taskify(function (a, cb) {
			expect(a).to.be.equal(1)
			expect(this).to.be.equal(context)
			done()
			cb(null, ++a)
		})
			.call(context, 1)
			.fork(new Function(), new Function())
	});

	it('pass function result outside', () => {
		const context = {a: 1}
		const result = taskify(function (cb) {
			setTimeout(cb, 0, null, null)
			return this
		})
			.call(context)
			.fork(new Function(), new Function())

		expect(result).to.be.equal(context)
	});

});
