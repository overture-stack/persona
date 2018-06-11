"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("./mongoose");
var vault_1 = require("./vault");
var config_1 = require("../config");
exports.getMongoCredentials = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, vault_1.default()];
        case 1: return [2 /*return*/, (_a.sent()) || { user: config_1.mongoUser, pass: config_1.mongoPass }];
    }
}); }); };
exports.constructMongoUri = function (_a) {
    var _b = (_a === void 0 ? {} : _a).includeDb, includeDb = _b === void 0 ? true : _b;
    return __awaiter(_this, void 0, void 0, function () {
        var _c, user, pass;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, exports.getMongoCredentials()];
                case 1:
                    _c = _d.sent(), user = _c.user, pass = _c.pass;
                    return [2 /*return*/, "mongodb://" + (user && pass
                            ? encodeURIComponent(user) + ":" + encodeURIComponent(pass) + "@"
                            : '') + config_1.mongoHost + (includeDb ? "/" + config_1.mongoDb : "")];
            }
        });
    });
};
var connect = function () {
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var uri;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.constructMongoUri()];
                case 1:
                    uri = _a.sent();
                    mongoose_1.default.connect(uri, { useMongoClient: true }, function (err) {
                        if (err) {
                            console.error('Error Connecting to mongo', err);
                            reject(err);
                        }
                        else {
                            console.log("Connected to mongo at mongodb://" + config_1.mongoHost + "/" + config_1.mongoDb);
                            resolve();
                        }
                    });
                    return [2 /*return*/];
            }
        });
    }); });
};
exports.default = connect;
//# sourceMappingURL=mongo.js.map