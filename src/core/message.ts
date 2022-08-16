
import {
    Response
} from './response'

export class Message {
    options:Message.options
    response:Response
    constructor(options) {
        this.options = options
    }

    hasDone() {
        return !!this.response
    }

    setResponse(res:Response) {
        this.response = res;
    }

    getInteract():Record<any,any> {
        return this.options.interact
    }

    getRequestMessage():string {
        return this.options.text
    }

    getResponseText() {
        let { response } = this;
        if (!response) return []

        return response.getMsg();
    }
}

export namespace Message {
    export type options = {
        text:string, // 输入的消息
        interact:unknown, // 交互器
    }
}