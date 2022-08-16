
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
                .set(chalk.green(`账号:weixuhong`))
                .set(chalk.green(`密码:S*0$&1ig!Wx6PtpFl3#^8I7U`))
                .set(chalk.green(`网址:https://portal.shouqianba.com/portal/overview`))
        })


        robot.registerParser(/^B端账(号|户)/i, (msg) => {
            new Response({ msg, robot })
                .set(chalk.green(`小红帽便利店：21690003046807  13958099751  a111111`))
                .set(chalk.green(`康一君测试商户：21690003074418    17705840828   a111111  115599`))
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