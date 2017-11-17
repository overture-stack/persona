import { composeWithMongoose } from 'graphql-compose-mongoose';
import { GQC } from 'graphql-compose';
import { UserModel } from '../models/UserProfile';

const UserTC = composeWithMongoose(UserModel, {});

function requireToken(resolvers) {
  return Object.keys(resolvers).reduce((acc, key) => {
    return {
      ...acc,
      [key]: resolvers[key].wrapResolve(next => resolverParameters => {
        if (!resolverParameters.context.jwt.valid) {
          throw new Error('You must provide valid token');
        }
        return next(resolverParameters);
      }),
    };
  }, {});
}

function requireSameUserMongoId(resolvers) {
  return Object.keys(resolvers).reduce((acc, key) => {
    return {
      ...acc,
      [key]: resolvers[key].wrapResolve(next => async resolverParameters => {
        const _id =
          resolverParameters.args._id || resolverParameters.args.record._id;
        const egoId = await UserModel.findOne({ _id }).then(
          user => user.ego_id,
        );

        if (
          resolverParameters.args.record &&
          resolverParameters.args.record.ego_id !== egoId
        ) {
          throw new Error("You can't change your ego id");
        } else if (
          `${egoId}` !== `${resolverParameters.context.jwt.payload.sub}`
        ) {
          throw new Error("You can't edit someone elses profile");
        } else {
          return next(resolverParameters);
        }
      }),
    };
  }, {});
}

GQC.rootQuery().addFields({
  user: UserTC.getResolver('findById'),
  users: UserTC.getResolver('pagination'),
});

GQC.rootMutation().addFields(
  requireToken({
    userCreate: UserTC.getResolver('createOne'),

    ...requireSameUserMongoId({
      userRemove: UserTC.getResolver('removeById'),
      userUpdate: UserTC.getResolver('updateById'),
    }),
  }),
);

export const schema = GQC.buildSchema();
