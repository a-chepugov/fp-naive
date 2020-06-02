import {Applicative, ApplicativeTypeRep} from "../../interfaces/Applicative";

import * as FunctionModule from "../../interfaces/Function";
type ARG1<F> = FunctionModule.ARG1<F>;
type RETURNS<F> = FunctionModule.RETURNS<F>;
const isFNA1 = FunctionModule.isFNA1;

export default (F: ApplicativeTypeRep<any>) => (G: ApplicativeTypeRep<any>) =>

    class Compose<A> implements Applicative<A> {
        private readonly value: Applicative<Applicative<A>>;

        constructor(value: Applicative<Applicative<A>>) {
            this.value = value;
        }

        map<B>(fn: (value: A) => B): Compose<B> {
            return new Compose(this.value.map((x) => x.map(fn)));
        }

        ap(other: Compose<ARG1<A>>): Compose<RETURNS<A>> | never {
            if (isFNA1<ARG1<A>, RETURNS<A>>(this.value)) {
                return other.map(this.value);
            } else {
                throw new Error('This is not a apply function: ' + this.inspect())
            }
        }

        static of<A>(x: A): Compose<Applicative<Applicative<A>>> {
            return new Compose(F.of(G.of(x)));
        }

        get() {
            return this.value;
        }

        inspect() {
            return `Compose(${
                // @ts-ignore
                this.value && typeof this.value.inspect === 'function' ? this.value.inspect() : this.value
            })`
        }
    }
