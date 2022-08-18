"use strict";
exports.__esModule = true;
exports.Message = void 0;
var Message = /** @class */ (function () {
    function Message(options) {
        this.options = options;
    }
    Message.prototype.hasDone = function () {
        return !!this.response;
    };
    Message.prototype.setResponse = function (res) {
        this.response = res;
    };
    Message.prototype.getInteract = function () {
        return this.options.interact;
    };
    Message.prototype.getRequestMessage = function () {
        return this.options.text;
    };
    Message.prototype.getResponseText = function () {
        var response = this.response;
        if (!response)
            return [];
        return response.getMsg();
    };
    return Message;
}());
exports.Message = Message;
