"use strict";
exports.__esModule = true;
exports.Response = void 0;
var Response = /** @class */ (function () {
    function Response(options) {
        if (!options.msg) {
            console.error("response msg error");
            process.exit(0);
        }
        this.options = options;
        this.text = [];
        if (options.text)
            this.text = [options.text];
        options.msg.setResponse(this);
    }
    Response.prototype.getMsg = function () {
        return this.text;
    };
    Response.prototype.set = function (msg) {
        this.text.push(msg);
        return this;
    };
    return Response;
}());
exports.Response = Response;
