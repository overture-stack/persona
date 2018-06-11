"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
var resolvers_1 = require("./resolvers");
exports.default = (function (UserModel) {
    var UserTC = graphql_compose_mongoose_1.composeWithMongoose(UserModel, {});
    UserTC.addResolver({
        kind: 'query',
        name: 'self',
        type: UserTC,
        resolve: resolvers_1.self(UserModel),
    });
    return UserTC;
});
//# sourceMappingURL=index.js.map