


import _ from 'lodash'
import Path from 'path'

import {
    helper
} from '../parsers/help'
import { Hooks } from './hooks'

import { Message } from './message'
import { Parser } from './parser'

let defaultParses = [
    helper
]

export class Robot {
    interact: Record<any,any>
    interactName: string
    options: Robot.options
    defaultInteractPath: string
    hooks:Record<any,any>
    parsers:Array<Parser>
    constructor(options: Robot.options) {

        this.options = options
        this.defaultInteractPath = Path.resolve(__dirname, '../interacts')

        this.loadInteract(); // 装载交互器,交互方式只有一个

        this.loadParsers(); // 装载解析器,
        this.hooks = {
            beforeParser:new Hooks(this,'beforeParser'), // 解析器接入之前
            beforeSend:new Hooks(this,'beforeSend'), // 解析完，开始发回
        }

        this.run()
    }


    run() {
        this.interact?.run();
    }

    async receive(message:Message) {

        await this.hooks.beforeParser.execute({ message })

    }

    loadScripts(path:string){
        try {
            let use = require(path);
            return use(this);
            
        } catch (error) {
            console.error(`load script faild, confirm ${path} is exsit`)
            process.exit(0)
        }
    }


    // 装载交互方式
    loadInteract() {
        let { interactName, interactPath } = this.options
        let path = interactPath ? interactPath : `${this.defaultInteractPath}/${interactName}`
        this.interact = this.loadScripts(path)
    }


    // 装载解析器文件脚本
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


    registerParser(reg:RegExp,cb:Function) {
        this.parsers.push(
            new Parser({
                robot:this,
                reg,
                cb
            })
        )

    }
}

export namespace Robot {
    export type options = {
        interactName?: string, // 交互方式
        interactPath?: string, // 可能是本地的交互器
        parserPaths?: Array<string>, // 解析器
    }
}