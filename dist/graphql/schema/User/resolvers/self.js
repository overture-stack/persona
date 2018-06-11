"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var self = function (UserModel) { return function (_a) {
    var context = _a.context;
    return UserModel.findOne({ egoId: context.jwt.sub });
}; };
exports.default = self;
//# sourceMappingURL=self.js.map