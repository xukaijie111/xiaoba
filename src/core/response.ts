import { Message } from "./message"
import { Robot } from "./robot"


export class Response {
    options:Response.options
    text:Array<string>
    constructor(options:Response.options) {

        if (!options.msg) {
            console.error(`response msg error`)
            process.exit(0)
        }
        this.options = options
        this.text = []
        if (options.text) this.text = [options.text]
        
        options.msg.setResponse(this);
    }

    getMsg(){
        return this.text;
    }

    set(msg:string):Response {
        this.text.push(msg);
        return this;
    }
}


export namespace Response {

    export type options = {
        text?:string, // 回复的消息
        robot:Robot,
        msg:Message
    }
}