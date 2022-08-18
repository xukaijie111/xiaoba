"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Robot = void 0;
var path = require('path');
var help_1 = require("../parsers/help");
var base_1 = require("../parsers/base");
var hooks_1 = require("./hooks");
var parser_1 = require("./parser");
var response_1 = require("./response");
var chalk = require('chalk');
var defaultParses = [
    help_1.helper,
    base_1.base
];
var Robot = /** @class */ (function () {
    function Robot(options) {
        this.options = options;
        this.parsers = [];
        this.name = options.name || "xiaoba";
        this.defaultInteractPath = path.resolve(__dirname, '../interacts');
        this.loadInteract(); // 装载交互器,交互方式只有一个
        this.loadParsers(); // 装载解析器,
        this.hooks = {
            beforeParser: new hooks_1.Hooks(this, 'beforeParser'),
            beforeSend: new hooks_1.Hooks(this, 'beforeSend')
        };
    }
    Robot.prototype.run = function () {
        var _a;
        (_a = this.interact) === null || _a === void 0 ? void 0 : _a.run();
    };
    Robot.prototype.receive = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.hooks.beforeParser.execute({ message: message })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.executeParser(message)];
                    case 2:
                        _a.sent();
                        if (!message.hasDone()) {
                            new response_1.Response({ msg: message, text: chalk.green("小八还小,不知道你的问的问题诶"), robot: this });
                        }
                        this.response(message);
                        return [2 /*return*/];
                }
            });
        });
    };
    Robot.prototype.response = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var interact;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.hooks.beforeSend.execute({ message: message })];
                    case 1:
                        _a.sent();
                        interact = message.getInteract();
                        interact.send(message);
                        return [2 /*return*/];
                }
            });
        });
    };
    Robot.prototype.executeParser = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var parsers, _i, parsers_1, parser;
            return __generator(this, function (_a) {
                parsers = this.parsers;
                for (_i = 0, parsers_1 = parsers; _i < parsers_1.length; _i++) {
                    parser = parsers_1[_i];
                    parser.run(message);
                    if (message.hasDone())
                        return [2 /*return*/];
                }
                return [2 /*return*/];
            });
        });
    };
    Robot.prototype.loadScripts = function (path) {
        try {
            var use = require(path);
            return use(this);
        }
        catch (error) {
            console.error("load script ".concat(path, " faild, ").concat(error));
            process.exit(0);
        }
    };
    // 装载交互方式
    Robot.prototype.loadInteract = function () {
        var _a = this.options, interactName = _a.interactName, interactPath = _a.interactPath;
        var path = interactPath ? interactPath : "".concat(this.defaultInteractPath, "/").concat(interactName);
        this.interact = this.loadScripts(path);
    };
    // 装载解析器文件脚本
    Robot.prototype.loadParsers = function () {
        var _this = this;
        try {
            var parserPaths = this.options.parserPaths;
            // 先装载默认的解析器
            defaultParses.forEach(function (parser) {
                parser(_this);
            });
            // 装载用户注入的解析器
            parserPaths === null || parserPaths === void 0 ? void 0 : parserPaths.forEach(function (path) {
                _this.loadScripts(path);
            });
        }
        catch (error) {
            console.error(error);
            process.exit(0);
        }
    };
    Robot.prototype.registerParser = function (reg, cb) {
        this.parsers.push(new parser_1.Parser({
            robot: this,
            reg: reg,
            cb: cb
        }));
    };
    return Robot;
}());
exports.Robot = Robot;
