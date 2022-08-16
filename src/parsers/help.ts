
import { Response } from '../core/response';
import {
    Robot
} from '../core/robot'

class Helper {
    robot:Robot
    constructor(robot:Robot) {
        this.robot = robot
    }

    run() {
       let { robot } = this;

       robot.registerParser(/^h(elp)?$/,(msg) => {
       
        new Response({robot,msg})
        .set(`xiaoba is robot you can ask questions by cli,voice,dingding etc.`)
        .set(`currently the cli mode has done`)

       })
    }
}

let helper = (robot:Robot) => {
    let h = new Helper(robot);
    h.run();
}



export {
    helper
}