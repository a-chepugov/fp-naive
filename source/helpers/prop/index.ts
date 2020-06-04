/**
 * @category Helpers
 * @description Gets the value uf property
 * @param {String | Number | Symbol} key
 * @summary prop :: String | Number | Symbol -> Object -> a
 * @example
 * let propA = prop('a');
 * propA({a: 3}); // 3
 */
export default function prop<K extends NonNullable<string | number | symbol>, T>(key: K): (target: T) => any {
    return function (target: T) {
        const {[key]: value} = target !== undefined && target !== null ? target : {};
        return value;
    }
}
