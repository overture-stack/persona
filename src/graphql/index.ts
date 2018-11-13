import { GQC } from 'graphql-compose';

import generateUserTC from './schema/User';
import generateTagsTC from './schema/Tags';
import {
  idGate,
  selfGate,
  adminOrAppGate,
  adminOrSelfGate,
  validTokenGate,
} from './aclGates';

const restrict = (resolver, ...restrictions) => {
  return resolver.wrapResolve(next => async rp => {
    await Promise.all(restrictions.map(r => r(rp)));
    return next(rp);
  });
};

const createSchema = ({ models, tags }) => {
  const UserTC = generateUserTC({ models });
  const TagsTC = generateTagsTC({ models, tags });

  const invalidTokenErrorMessage = 'You must provide valid token';

  GQC.rootQuery().addFields({
    self: restrict(
      UserTC.getResolver('self'),
      validTokenGate({ errMsg: invalidTokenErrorMessage }),
    ),
    user: restrict(
      UserTC.getResolver('findById'),
      adminOrAppGate({
        errMsg:
          'Access denied. You need Admin privileges to access this resource',
      }),
    ),
    users: restrict(
      UserTC.getResolver('pagination'),
      adminOrAppGate({
        errMsg:
          'Access denied. You need Admin privileges to access this resource',
      }),
    ),
    tags: TagsTC.getResolver('listAll'),
  });

  GQC.rootMutation().addFields({
    userCreate: restrict(
      UserTC.getResolver('createOne'),
      validTokenGate({ errMsg: invalidTokenErrorMessage }),
    ),
    userRemove: restrict(
      UserTC.getResolver('removeById'),
      validTokenGate({ errMsg: invalidTokenErrorMessage }),
      adminOrSelfGate({
        models,
        errMsg: `Access denied. You need admin access to perform this action on someone else's account`,
      }),
    ),
    userUpdate: restrict(
      UserTC.getResolver('updateById'),
      validTokenGate({ errMsg: invalidTokenErrorMessage }),
      selfGate({ models, errMsg: `You can't edit someone elses profile` }),
      idGate({ models, errMsg: "You can't change your ego id" }),
    ),
  });

  return GQC.buildSchema();
};

export default createSchema;
