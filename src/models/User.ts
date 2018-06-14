export default {
  fields: {
    //ego fields
    egoId: {
      type: 'String',
      required: true,
      unique: true,
    },
    isPublic: {
      type: 'Boolean',
      default: false,
    },
  },
  collection: 'usermodels',
};
