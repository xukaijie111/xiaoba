


import * as _ from 'lodash'
let path = require('path')

import {
    helper
} from '../parsers/help'

import {
    base
} from '../parsers/base'
import { Hooks } from './hooks'


import { Message } from './message'
import { Parser } from './parser'
import { Response } from './response'

let chalk = require('chalk')

let defaultParses = [
    helper,
    base
]

export class Robot {
    interact: Record<any,any>
    interactName: string
    options: Robot.options
    defaultInteractPath: string
    hooks:Record<any,any>
    parsers:Array<Parser>
    name:string
    constructor(options: Robot.options) {

        this.options = options
        this.parsers = [];
        this.name = options.name || "xiaoba"
        this.defaultInteractPath = path.resolve(__dirname, '../interacts')

        this.loadInteract(); // 装载交互器,交互方式只有一个

        this.loadParsers(); // 装载解析器,
        this.hooks = {
            beforeParser:new Hooks(this,'beforeParser'), // 解析器接入之前
            beforeSend:new Hooks(this,'beforeSend'), // 解析完，开始发回
        }
    }


    run() {
        this.interact?.run();
    }

    async receive(message:Message) {

        await this.hooks.beforeParser.execute({ message })

        await this.executeParser(message)

        if (!message.hasDone()) {

            new Response({ msg:message,text:chalk.green("小八还小,不知道你的问的问题诶"),robot:this})

        }

        this.response(message);
    }

    async response(message:Message) {
        await this.hooks.beforeSend.execute({ message });
        
        let interact = message.getInteract();

        interact.send(message);
    }


    async executeParser(message:Message) {

        let { parsers } = this;

        for (let parser of parsers) {
            parser.run(message)
            if (message.hasDone())
            return;
        }
    }

    loadScripts(path:string){
        try {
            let use = require(path);
            return use(this);
            
        } catch (error) {
            console.error(`load script ${path} faild, ${error}`)
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
        name?:string, //机器人名字
    }
}