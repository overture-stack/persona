import { composeWithMongoose } from 'graphql-compose-mongoose';
import { GQC } from 'graphql-compose';
import { UserModel } from '../models/UserProfile';

const UserTC = composeWithMongoose(UserModel, {});

GQC.rootQuery().addFields({
  user: UserTC.getResolver('findById'),
  users: UserTC.getResolver('pagination'),
});

GQC.rootMutation().addFields({
  userCreate: UserTC.getResolver('createOne'),
  userUpdate: UserTC.getResolver('updateById'),
  userRemove: UserTC.getResolver('removeById'),
});

export const schema = GQC.buildSchema();
