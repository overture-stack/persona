import { schemaComposer } from 'graphql-compose';

import { listAll } from './resolvers';

const generateTagsTC = ({ models, tags }) => {
  const ItemTC = schemaComposer.createObjectTC(`
    type Tag {
      count: Int!
      value: String!
    }
  `);

  const TagsTC = schemaComposer.createObjectTC(`
    type Tags {
      count: Int!
    }
  `);

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
    resolve: listAll({ models, tags }),
  });

  return TagsTC;
};

export default generateTagsTC;
