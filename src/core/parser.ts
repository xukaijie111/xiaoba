import { Message } from "./message";
import { Robot } from "./robot"



export class Parser {
    options: Parser.options
    constructor(options: Parser.options) {
        this.options = options;
    }


    async run(message: Message) {
        let { reg, cb, robot } = this.options
        let text = message.getRequestMessage();

        let match = text.match(reg)

        if (match) {
            await cb(message);
        }
    }
}


export namespace Parser {
    export type options = {
        robot: Robot,
        reg: RegExp,
        cb: Function
    }
}