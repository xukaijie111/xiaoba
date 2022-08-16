
import {
    Robot
} from '../core/robot'

class Helper {
    robot:Robot
    constructor(robot:Robot) {
        this.robot = robot
    }

    run() {
        console.log(`####123`);
    }
}

let helper = (robot:Robot) => {
    let h = new Helper(robot);
    h.run();
}



export {
    helper
}