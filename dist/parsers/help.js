"use strict";
exports.__esModule = true;
exports.helper = void 0;
var response_1 = require("../core/response");
var Helper = /** @class */ (function () {
    function Helper(robot) {
        this.robot = robot;
    }
    Helper.prototype.run = function () {
        var robot = this.robot;
        robot.registerParser(/^h(elp)?$/, function (msg) {
            new response_1.Response({ robot: robot, msg: msg })
                .set("xiaoba is robot you can ask questions by cli,voice,dingding etc.")
                .set("currently the cli mode has done");
        });
    };
    return Helper;
}());
var helper = function (robot) {
    var h = new Helper(robot);
    h.run();
};
exports.helper = helper;
