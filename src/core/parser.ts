import { Robot } from "./robot"



export class Parser {
    options:Parser.options
    constructor(options:Parser.options) {
        this.options = options;
    }
}


export namespace Parser {
    export type options = {
        robot:Robot,
        reg:RegExp,
        cb:Function
    }
}