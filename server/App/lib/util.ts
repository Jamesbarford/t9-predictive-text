import util from "util";

export function lowerCase(arg?: any): any {
    return typeof arg === "string" ? arg.toLowerCase() : arg;
}

export function log(myObject: any) {
    console.log(util.inspect(myObject, { showHidden: false, depth: null, colors: true }));
}

export function isEmptyString(arg?: string): boolean {
    return !arg || arg.trim() === "";
}
