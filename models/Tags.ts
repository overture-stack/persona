import { TypeComposer } from 'graphql-compose';
import { UserModel } from './UserProfile';


export const TagsTC = TypeComposer.create(`
  type Tags {
    values:[String]!
  }
`);

// Add resolver method
TagsTC.addResolver({
  kind: 'query',
  name: 'listAll',
  type: TagsTC, // array of tags
  resolve: async ({ args, context }) => {
    let results = await UserModel.collection.distinct("interests");
    return { values: results };
  },
});