
import {
    Robot
} from '../core/robot'

const readline = require('readline')
const Stream = require('stream')
const cline = require('cline')
const chalk = require('chalk')

import {
    Message
} from '../core/message'

let exitCommands = [
    'exit',
    'quit'
]
export class Shell {
    cli:any
    options:Shell.options
    constructor(options:Shell.options) {
        this.options = options;
    }


    send(message:Message){
        let strings = message.getResponseText()
        

        Array.from(strings).forEach(str => console.log(chalk.bold(`${str}`)))
    }


    run() {
        let { robot } = this.options
        this.cli = cline()

        this.cli.command('*', input => {
           if (exitCommands.includes(input)) return process.exit(0)
           robot.receive(new Message({ text:input,interact:this }))
        })
    
        this.cli.interact(`${robot.name}> `)
      
    }
}


export namespace Shell {
    export type options = {
        robot:Robot
    }
}


module.exports = (robot:Robot) => new Shell({robot})