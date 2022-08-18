"use strict";
exports.__esModule = true;
exports.Shell = void 0;
var readline = require('readline');
var Stream = require('stream');
var cline = require('cline');
var chalk = require('chalk');
var message_1 = require("../core/message");
var exitCommands = [
    'exit',
    'quit'
];
var Shell = /** @class */ (function () {
    function Shell(options) {
        this.options = options;
    }
    Shell.prototype.send = function (message) {
        var strings = message.getResponseText();
        Array.from(strings).forEach(function (str) { return console.log(chalk.bold("".concat(str))); });
    };
    Shell.prototype.run = function () {
        var _this = this;
        var robot = this.options.robot;
        this.cli = cline();
        this.cli.command('*', function (input) {
            if (exitCommands.includes(input))
                return process.exit(0);
            robot.receive(new message_1.Message({ text: input, interact: _this }));
        });
        this.cli.interact("".concat(robot.name, "> "));
    };
    return Shell;
}());
exports.Shell = Shell;
module.exports = function (robot) { return new Shell({ robot: robot }); };
