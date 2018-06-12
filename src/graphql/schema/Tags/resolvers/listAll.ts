import { get } from 'lodash';

const matchQuery = filter => ({
  $match: { interests: new RegExp(`.*${filter}.*`, 'gi') },
});

const fetchUserInterestAggs = ({
  model,
  field,
  filter,
  skip,
  size,
  dollarField = `$${field}`,
}) =>
  new Promise<any>((res, rej) =>
    model.collection.aggregate(
      [
        ...(filter ? [matchQuery(filter)] : []),
        { $unwind: dollarField },
        ...(filter ? [matchQuery(filter)] : []),
        {
          $facet: {
            count: [{ $sortByCount: dollarField }, { $count: field }],
            interests: [
              { $sortByCount: dollarField },
              { $skip: skip },
              { $limit: size },
            ],
          },
        },
      ],
      (e, r) => (e ? rej(e) : res(r)),
    ),
  );

const listAll = ({ models, tags }) => async ({
  args,
  context,
}: {
  args: any;
  context: any;
}) => {
  const {
    model,
    field,
    filter,
    skip = 0,
    size = 10,
  }: {
    model: string;
    field: string;
    filter: string;
    skip: number;
    size: number;
  } = args;

  if (!models[model])
    throw new Error(
      `Invalid model ${model}. Supported Models: ${Object.keys(tags).join(
        ', ',
      )}`,
    );

  if (!tags[model].includes(field))
    throw new Error(
      `Invalid field ${field}. Supported fields: ${tags[model].join(', ')}`,
    );

  const results = await fetchUserInterestAggs({
    model: models[model],
    field,
    filter,
    skip,
    size,
  });

  return {
    count: get(results, `[0].count[0].${field}`, 0),
    values: get(results, `[0].${field}`, []).map(x => ({
      count: x.count,
      value: x._id,
    })),
  };
};

export default listAll;
