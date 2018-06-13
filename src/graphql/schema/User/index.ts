import { composeWithMongoose } from 'graphql-compose-mongoose';
import { set } from 'lodash';

import { self as selfResolver } from './resolvers';

export default ({ models: { User } }) => {
  const UserTC = composeWithMongoose(User, {});

  UserTC.addResolver({
    kind: 'query',
    name: 'self',
    type: UserTC,
    resolve: selfResolver(User),
  });

  UserTC.setResolver(
    'protectedFindById',
    UserTC.getResolver('findById').wrapResolve(next => async rp => {
      const result = await next(rp);
      return result && (await User.findById(rp.args._id)).isPublic
        ? result
        : null;
    }),
  );

  UserTC.setResolver(
    'protectedPagination',
    UserTC.getResolver('pagination').wrapResolve(next => rp =>
      next(set(rp, 'args.filter', { ...rp.args.filter, isPublic: true })),
    ),
  );

  return UserTC;
};
