import * as ApplicativeModule from "../../interfaces/Applicative";

type Applicative<A> = ApplicativeModule.Applicative<A>;
type ApplicativeTypeRep<A> = ApplicativeModule.ApplicativeTypeRep<A>;
type Apply<A> = ApplicativeModule.Apply.Apply<A>;
type ARG1<A> = ApplicativeModule.Apply.ARG1<A>;
type RETURNS<A> = ApplicativeModule.Apply.RETURNS<A>;
const isFN = ApplicativeModule.Apply.isFN;

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
            if (isFN<ARG1<A>, RETURNS<A>>(this.value)) {
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
