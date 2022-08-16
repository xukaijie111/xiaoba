
import {
    Robot
} from '../core/robot'

export class Shell {
    options:Shell.options
    constructor(options:Shell.options) {
        this.options = options;
    }


    send(){

    }


    run() {
        
    }
}


export namespace Shell {
    export type options = {
        robot:Robot
    }
}


export const shell = (robot:Robot) => new Shell({robot})