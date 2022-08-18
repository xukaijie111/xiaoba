"use strict";
exports.__esModule = true;
exports.base = void 0;
var response_1 = require("../core/response");
var chalk = require('chalk');
var Base = /** @class */ (function () {
    function Base(robot) {
        this.robot = robot;
    }
    Base.prototype.run = function () {
        var robot = this.robot;
        robot.registerParser(/^火山账号/, function (msg) {
            new response_1.Response({ msg: msg, robot: robot });
        });
        robot.registerParser(/^B端账(号|户)/i, function (msg) {
            new response_1.Response({ msg: msg, robot: robot });
        });
    };
    return Base;
}());
var base = function (robot) {
    var h = new Base(robot);
    h.run();
};
exports.base = base;
