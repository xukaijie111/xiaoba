import { Robot } from "./robot";

export class Hooks {

    robot:Robot
    list:Array<Function>
    name:string
    constructor(robot:Robot,name:string){
        this.name = name
        this.robot = robot
        this.list = []
    }


    async execute() {

        
    }

    register(func:Function) {
        if (this.list.indexOf(func) !== -1) this.list.push(func)
    }


    unRegister(func:Function) {
        let index = this.list.indexOf(func)
        if (index !== -1) this.list.splice(index,1)
    }
}