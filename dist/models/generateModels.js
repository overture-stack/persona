"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var User_1 = require("./User");
var defaults = {
    User: User_1.default,
};
var setDefaults = function (_a) {
    var name = _a.name, fields = _a.fields, collection = _a.collection;
    var schema = new mongoose.Schema(__assign({}, fields, defaults[name].fields), {
        collection: collection || defaults[name].collection,
    });
    return mongoose.model(name + "Model", schema);
};
var generateModels = function (schemas) {
    return Object.keys(defaults).reduce(function (obj, name) {
        return (__assign({}, obj, (_a = {}, _a[name] = setDefaults(__assign({ name: name }, schemas[name])), _a)));
        var _a;
    }, {});
};
exports.default = generateModels;
//# sourceMappingURL=generateModels.js.map