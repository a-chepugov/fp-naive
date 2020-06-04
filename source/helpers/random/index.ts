/**
 * @category Helpers
 * @description Returns random number between `a` and `b`
 * @summary random :: (Number, Number) -> Number
 * @param {Number} a - first boundary for random result
 * @param {Number} b - second boundary for random result
 * @returns {Number}
 */
export default function random(a: number = 0, b: number = 1): number {
    return Math.floor((Math.random() * (b - a)) + a);
}
