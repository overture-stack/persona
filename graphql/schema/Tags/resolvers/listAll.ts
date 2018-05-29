import { get } from 'lodash';

import UserModel from 'models/User';

const matchQuery = filter => ({
  $match: { interests: new RegExp(`.*${filter}.*`, 'gi') },
});

const fetchUserInterestAggs = ({ filter, skip, size }) =>
  new Promise<any>((res, rej) =>
    UserModel.collection.aggregate(
      [
        ...(filter ? [matchQuery(filter)] : []),
        { $unwind: '$interests' },
        ...(filter ? [matchQuery(filter)] : []),
        {
          $facet: {
            count: [{ $sortByCount: '$interests' }, { $count: 'interests' }],
            interests: [
              { $sortByCount: '$interests' },
              { $skip: skip },
              { $limit: size },
            ],
          },
        },
      ],
      (e, r) => (e ? rej(e) : res(r)),
    ),
  );

export default async ({ args, context }: { args: any; context: any }) => {
  const {
    filter,
    skip = 0,
    size = 10,
  }: { filter: string; skip: number; size: number } = args;

  const results = await fetchUserInterestAggs({ filter, skip, size });

  return {
    count: get(results, '[0].count[0].interests', 0),
    values: get(results, '[0].interests', []).map(x => ({
      count: x.count,
      value: x._id,
    })),
  };
};
