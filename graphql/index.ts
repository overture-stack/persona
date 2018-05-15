import { GQC } from 'graphql-compose';

import TagsTC from 'graphql/schema/Tags';
import UserTC from 'graphql/schema/User';
import UserModel from 'models/User';

const validToken = async ({ context }) => {
  if (!context.jwt.valid) throw new Error('You must provide valid token');
};

const isSelf = async ({ args, context }) => {
  const _id = args._id || args.record._id;
  const egoId = await UserModel.findOne({ _id }).then(user => user.egoId);

  if (args.record && args.record.egoId !== egoId) {
    throw new Error("You can't change your ego id");
  } else if (`${egoId}` !== `${context.jwt.sub}`) {
    throw new Error("You can't edit someone elses profile");
  }
};

const restrict = (resolver, ...restrictions) => {
  return resolver.wrapResolve(next => async rp => {
    await Promise.all(restrictions.map(r => r(rp)));
    return next(rp);
  });
};

const createSchema = () => {
  GQC.rootQuery().addFields({
    user: UserTC.getResolver('findById'),
    users: UserTC.getResolver('pagination'),
    tags: TagsTC.getResolver('listAll'),
  });

  GQC.rootMutation().addFields({
    userCreate: restrict(UserTC.getResolver('createOne'), validToken),
    userRemove: restrict(UserTC.getResolver('removeById'), validToken, isSelf),
    userUpdate: restrict(UserTC.getResolver('updateById'), validToken, isSelf),
  });

  return GQC.buildSchema();
};

export default createSchema;
