import { composeWithMongoose } from 'graphql-compose-mongoose';

import { self as selfResolver } from './resolvers';

export default UserModel => {
  const UserTC = composeWithMongoose(UserModel, {});

  UserTC.addResolver({
    kind: 'query',
    name: 'self',
    type: UserTC,
    resolve: selfResolver(UserModel),
  });

  return UserTC;
};
