import { GQC } from 'graphql-compose';
import { get } from 'lodash';

import generateUserTC from './schema/User';
import generateTagsTC from './schema/Tags';

const validToken = async ({ context }) => {
  if (!context.jwt.valid) throw new Error('You must provide valid token');
};

const isSelf = models => async ({ args, context }) => {
  const _id = args._id || args.record._id;
  const egoId = await models.User.findOne({ _id }).then(user => user.egoId);

  if (args.record && args.record.egoId !== egoId) {
    throw new Error("You can't change your ego id");
  } else if (`${egoId}` !== `${context.jwt.sub}`) {
    throw new Error("You can't edit someone elses profile");
  }
};

const isAdmin = async ({ context: { jwt } }) => {
  const roles = get(jwt, 'context.user.roles') || [];
  if (!roles.includes('ADMIN')) {
    throw new Error(
      'Access denied. You need Admin privileges to access this resource',
    );
  }
};

const restrict = (resolver, ...restrictions) => {
  return resolver.wrapResolve(next => async rp => {
    await Promise.all(restrictions.map(r => r(rp)));
    return next(rp);
  });
};

const createSchema = ({ models, tags }) => {
  const UserTC = generateUserTC({ models });
  const TagsTC = generateTagsTC({ models, tags });

  GQC.rootQuery().addFields({
    self: restrict(UserTC.getResolver('self'), validToken),
    user: restrict(UserTC.getResolver('protectedFindById')),
    users: restrict(UserTC.getResolver('protectedPagination')),
    tags: TagsTC.getResolver('listAll'),
  });

  GQC.rootMutation().addFields({
    userCreate: restrict(UserTC.getResolver('createOne'), validToken),
    userRemove: restrict(UserTC.getResolver('removeById'), validToken, isAdmin),
    userUpdate: restrict(
      UserTC.getResolver('updateById'),
      validToken,
      isSelf(models),
    ),
  });

  return GQC.buildSchema();
};

export default createSchema;
