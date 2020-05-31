/**
 * Returns random number between `a` and `b`
 * @name random
 * @param {Number} a
 * @param {Number} b
 * @return {Number}
 */
export default function random(a: number = 0, b: number = 1): number {
    return Math.floor((Math.random() * (b - a)) + a);
}
