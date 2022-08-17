
import { Response } from '../core/response';
import {
    Robot
} from '../core/robot'

let chalk = require('chalk')

class Base {
    robot: Robot
    constructor(robot: Robot) {
        this.robot = robot
    }

    run() {
        let { robot } = this;

        robot.registerParser(/^火山账号/, (msg) => {
            new Response({ msg, robot })
              
        })


        robot.registerParser(/^B端账(号|户)/i, (msg) => {
            new Response({ msg, robot })
               
        })


    }



}

let base = (robot: Robot) => {
    let h = new Base(robot);
    h.run();
}



export {
    base
}