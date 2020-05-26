// prop :: String -> Object -> a
export default function prop<K extends NonNullable<any>, T>(key: K) {
    return function (target: T): any {
        const {[key]: value} = target !== undefined && target !== null ? target : {};
        return value;
    }
}
