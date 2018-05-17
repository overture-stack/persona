import { composeWithMongoose } from 'graphql-compose-mongoose';

import UserModel from 'models/User';
import { self as selfResolver } from './resolvers';

const UserTC = composeWithMongoose(UserModel, {});

UserTC.addResolver({
  kind: 'query',
  name: 'self',
  type: UserTC,
  resolve: selfResolver,
});

export default UserTC;
