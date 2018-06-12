import * as mongoose from 'mongoose';

import userDefaults from './User';

const defaults = {
  User: userDefaults,
};

const setDefaults = ({ name, fields, collection }) => {
  const schema = new mongoose.Schema(
    {
      ...fields,
      ...defaults[name].fields,
    },
    {
      collection: collection || defaults[name].collection,
    },
  );
  return mongoose.model(`${name}Model`, schema);
};

const generateModels = schemas =>
  Object.keys(defaults).reduce(
    (obj, name) => ({
      ...obj,
      [name]: setDefaults({ name, ...schemas[name] }),
    }),
    {},
  );

export default generateModels;
