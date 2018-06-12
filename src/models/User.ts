export default {
  fields: {
    //ego fields
    egoId: {
      type: 'String',
      required: true,
      unique: true,
    },
  },
  collection: 'usermodels',
};
