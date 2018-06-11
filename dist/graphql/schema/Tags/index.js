"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_compose_1 = require("graphql-compose");
var resolvers_1 = require("./resolvers");
var generateTagsTC = function (_a) {
    var models = _a.models, tags = _a.tags;
    var ItemTC = graphql_compose_1.TypeComposer.create("\n    type Tag {\n      count: Int!\n      value: String!\n    }\n  ");
    var TagsTC = graphql_compose_1.TypeComposer.create("\n    type Tags {\n      count: Int!\n    }\n  ");
    TagsTC.addFields({
        values: [ItemTC],
    });
    TagsTC.addResolver({
        kind: 'query',
        name: 'listAll',
        type: TagsTC,
        args: {
            model: 'String!',
            field: 'String!',
            filter: 'String',
            skip: 'Int',
            size: 'Int',
        },
        resolve: resolvers_1.listAll({ models: models, tags: tags }),
    });
    return TagsTC;
};
exports.default = generateTagsTC;
//# sourceMappingURL=index.js.map