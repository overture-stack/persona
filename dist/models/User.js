"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    fields: {
        //ego fields
        egoId: {
            type: 'String',
            required: true,
            unique: true,
        },
        email: 'String',
    },
    collection: 'usermodels',
};
//# sourceMappingURL=User.js.map