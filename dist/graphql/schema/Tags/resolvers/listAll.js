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
var lodash_1 = require("lodash");
var matchQuery = function (filter) { return ({
    $match: { interests: new RegExp(".*" + filter + ".*", 'gi') },
}); };
var fetchUserInterestAggs = function (_a) {
    var model = _a.model, field = _a.field, filter = _a.filter, skip = _a.skip, size = _a.size, _b = _a.dollarField, dollarField = _b === void 0 ? "$" + field : _b;
    return new Promise(function (res, rej) {
        return model.collection.aggregate((filter ? [matchQuery(filter)] : []).concat([
            { $unwind: dollarField }
        ], (filter ? [matchQuery(filter)] : []), [
            {
                $facet: {
                    count: [{ $sortByCount: dollarField }, { $count: field }],
                    interests: [
                        { $sortByCount: dollarField },
                        { $skip: skip },
                        { $limit: size },
                    ],
                },
            },
        ]), function (e, r) { return (e ? rej(e) : res(r)); });
    });
};
var listAll = function (_a) {
    var models = _a.models, tags = _a.tags;
    return function (_a) {
        var args = _a.args, context = _a.context;
        return __awaiter(_this, void 0, void 0, function () {
            var model, field, filter, _b, skip, _c, size, results;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        model = args.model, field = args.field, filter = args.filter, _b = args.skip, skip = _b === void 0 ? 0 : _b, _c = args.size, size = _c === void 0 ? 10 : _c;
                        if (!models[model])
                            throw new Error("Invalid model " + model + ". Supported Models: " + Object.keys(tags).join(', '));
                        if (!tags[model].includes(field))
                            throw new Error("Invalid field " + field + ". Supported fields: " + tags[model].join(', '));
                        return [4 /*yield*/, fetchUserInterestAggs({
                                model: models[model],
                                field: field,
                                filter: filter,
                                skip: skip,
                                size: size,
                            })];
                    case 1:
                        results = _d.sent();
                        return [2 /*return*/, {
                                count: lodash_1.get(results, "[0].count[0]." + field, 0),
                                values: lodash_1.get(results, "[0]." + field, []).map(function (x) { return ({
                                    count: x.count,
                                    value: x._id,
                                }); }),
                            }];
                }
            });
        });
    };
};
exports.default = listAll;
//# sourceMappingURL=listAll.js.map