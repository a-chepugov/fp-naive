import curry from "../curry";

// prop :: String -> Object -> a
export function prop<T, K extends keyof T>(target: T, key: K) {
    const {[key]: value} = target !== undefined && target !== null ? target : {};
    return value;
}

export default curry(prop);
