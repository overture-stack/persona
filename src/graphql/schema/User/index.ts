import { composeWithMongoose } from 'graphql-compose-mongoose';

import { self as selfResolver } from './resolvers';

export default ({ models }) => {
  const UserTC = composeWithMongoose(models.User, {});

  UserTC.addResolver({
    kind: 'query',
    name: 'self',
    type: UserTC,
    resolve: selfResolver(models.User),
  });

  return UserTC;
};
