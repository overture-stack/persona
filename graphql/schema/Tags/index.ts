import { TypeComposer } from 'graphql-compose';

import UserModel from 'models/User';
import { listAll } from './resolvers';

const ItemTC = TypeComposer.create(`
  type Tag {
    count: Int!
    value: String!
  }
`);

const TagsTC = TypeComposer.create(`
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
    filter: 'String',
    skip: 'Int',
    size: 'Int',
  },
  resolve: listAll,
});

export default TagsTC;
