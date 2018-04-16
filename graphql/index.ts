import { composeWithMongoose } from 'graphql-compose-mongoose';
import { GQC } from 'graphql-compose';
import { CreateUserModel } from '../models/UserProfile';
import { some as promiseSome } from 'bluebird';

const createSchema = () => {
  const userModel = CreateUserModel();

  const UserTC = composeWithMongoose(userModel, {});

  async function validToken({ context }) {
    if (!context.jwt.valid) {
      throw new Error('You must provide valid token');
    } else {
      return true;
    }
  }

  async function isSelf({ args, context }) {
    const _id = args._id || args.record._id;
    const egoId = await userModel.findOne({ _id }).then(user => user.egoId);

    if (args.record && args.record.egoId !== egoId) {
      throw new Error("You can't change your ego id");
    } else if (`${egoId}` !== `${context.jwt.sub}`) {
      throw new Error("You can't edit someone elses profile");
    } else {
      return true;
    }
  }

  function restrict(resolver, ...restrictions) {
    return resolver.wrapResolve(next => resolverParameters => {
      return Promise.all(
        restrictions.map(restriction => {
          return promiseSome(
            [].concat(restriction).map(r => r(resolverParameters)),
            1,
          );
        }),
      ).then(results => next(resolverParameters));
    });
  }

  GQC.rootQuery().addFields({
    user: UserTC.getResolver('findById'),
    users: UserTC.getResolver('pagination'),
  });

  GQC.rootMutation().addFields({
    userCreate: restrict(UserTC.getResolver('createOne'), validToken),
    userRemove: restrict(UserTC.getResolver('removeById'), validToken, isSelf),
    userUpdate: restrict(UserTC.getResolver('updateById'), validToken, isSelf),
  });

  return GQC.buildSchema();
};

export default createSchema;
