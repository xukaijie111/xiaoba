


import _ from 'lodash'
import Path from 'path'

import {
    helper
} from '../parsers/help'

let defaultParses = [
    helper
]

export class Robot {
    interact: Function
    interactName: string
    options: Robot.options
    defaultInteractPath: string
    constructor(options: Robot.options) {

        this.options = options
        this.defaultInteractPath = Path.resolve(__dirname, '../interacts')

        this.loadInteract(); // 装载交互器,交互方式只有一个

        this.loadParsers(); // 装载解析器,


    }


    loadScripts(path:string){
        try {
            let use = require(path);
            use(this);
        } catch (error) {
            console.error(`load script faild, confirm ${path} is exsit`)
            process.exit(0)
        }
    }


    // 装载交互方式
    loadInteract() {
        let { interactName, interactPath } = this.options
        let path = interactPath ? interactPath : `${this.defaultInteractPath}/${interactName}`
        this.loadScripts(path)
    }


    loadParsers() {

        try {

            let { parserPaths } = this.options;

            // 先装载默认的解析器
            defaultParses.forEach((parser) => {
                parser(this);
            })

            // 装载用户注入的解析器
            parserPaths?.forEach((path) => {
                this.loadScripts(path)
            })


        } catch (error) {
            console.error(error)
            process.exit(0)
        }



    }
}

export namespace Robot {
    export type options = {
        interactName?: string, // 交互方式
        interactPath?: string, // 可能是本地的交互器


        parserPaths?: Array<string>,
    }
}