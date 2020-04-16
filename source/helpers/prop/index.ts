import curry from "../curry";

export function prop(target: any, key: string) {
    const {[key]: value} = target !== undefined && target !== null ? target : {};
    return value;
}

export default curry(prop);
