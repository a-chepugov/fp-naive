// prop :: String | Number | Symbol -> Object -> a
export default function prop<K extends NonNullable<string | number | symbol>, T>(key: K) {
    return function (target: T): any {
        const {[key]: value} = target !== undefined && target !== null ? target : {};
        return value;
    }
}
