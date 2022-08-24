
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
            let res = new Response({ msg, robot })

            try {
                let config = require('../../config.json')
                let { huoshan } = config;
                res.set(`account: ${huoshan.account}`)
                .set(`pwd:${huoshan.pwd}`)
                .set(`url: ${huoshan.url}`)
            } catch (error) {
                
            }

              
        })


        robot.registerParser(/^B端账(号|户)/i, (msg) => {
            let res = new Response({ msg, robot })
            try {
                let config = require('../../config.json')
                let { baccount } = config;
                res.set(`account: ${baccount.account}`)
                .set(`pwd:${baccount.pwd}`)
            } catch (error) {
                
            }
               
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