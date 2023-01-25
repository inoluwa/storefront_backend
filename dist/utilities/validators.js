"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validateQuery = function (fields) {
    var properties = { filename: '', height: 0, width: 0 };
    var paramsKeys = Object.keys(properties);
    var modelParams = Object.keys(fields);
    return paramsKeys.every(function (item) { return modelParams.indexOf(item) !== -1; });
};
exports.default = validateQuery;
