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

		it("map doesn't invoke original function", (done) => {
			let counter = 0;
			const inc = () => counter++;
			const instance = new Testee((_reject: any, _resolve: any) => _resolve(inc()));
			expect(counter).to.be.equal(0);
			const mapped = instance.map((a: number) => a ** 2);
			expect(counter).to.be.equal(0);

			mapped.fork(console.error, () => {
				expect(counter).to.be.equal(1);
				done();
			})
		})

	});

	describe("Apply", () => {

		it("ap doesn't invoke handlers until fork method", (done) => {
			let counter = 0;
			const sum = (_reject: any, _resolve: any) => {
				counter++;
				_resolve(() => counter++);
			};
			const instanceSum = new Testee(sum);
			const instance = new Testee((_reject: any, _resolve: any) => _resolve(counter++));
			expect(counter).to.be.equal(0);

			const aped = instanceSum.ap(instance);
			expect(counter).to.be.equal(0);

			aped.fork(console.error, () => {
				expect(counter).to.be.equal(3);
				done();
			});
		});

		it("ap takes argument from function result", (done) => {
			const pow2 = (_reject: any, _resolve: any) => _resolve((a: number) => a ** 2);
			const instanceSum = new Testee(pow2);
			const instance = Testee.of(2);
			const aped = instanceSum.ap(instance);

			aped.fork(console.error, (response: number) => {
				expect(response).to.be.equal(4);
				done();
			});
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


	it("join invokes internal Task", (done) => {
		const instance = Testee.of(new Testee((_reject, resolve) => resolve(3)));
		const internal = instance.join();
		expect(internal).to.be.instanceof(Testee);

		internal.fork(console.error, (response) => {
			expect(response).to.be.equal(3);
			done();
		});
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

	it("Task action receives reject handler result", (done) => {
		const instance = new Testee((_reject: any, _resolve: any) => {
			const result = _reject();
			expect(result).to.be.equal('reject');
			done();
		});
		instance.fork(() => 'reject', () => 'resolve');
	});

	it("Task action receives resolve handler result", (done) => {
		const instance = new Testee((_reject: any, _resolve: any) => {
			const result = _resolve();
			expect(result).to.be.equal('resolve');
			done();
		});
		instance.fork(() => 'reject', () => 'resolve');
	});

});
