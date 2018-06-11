import * as mongoose from 'mongoose';

const Role = {
  type: String,
  enum: ['research', 'community', 'health'],
};

const UserSchema = new mongoose.Schema(
  {
    //ego fields
    egoId: {
      type: 'String',
      required: true,
      unique: true,
    },
    email: 'String',

    acceptedTerms: 'boolean',

    //subscription opt-ins
    acceptedKfOptIn: 'boolean',
    acceptedNihOptIn: 'boolean',

    //about me fields
    roles: [Role],
    title: 'String',
    firstName: 'String',
    lastName: 'String',
    jobTitle: 'String',
    institution: 'String',
    city: 'String',
    state: 'String',
    country: 'String',

    // a bit about yourself
    bio: 'String',
    story: 'String',

    // research interests
    website: 'String',
    googleScholarId: 'String',
    interests: ['String'],

    sets: [
      {
        name: 'String',
        size: 'String',
        type: { type: 'String' },
        setId: 'String',
      },
    ],
  },
  { collection: 'usermodels' },
);

const UserModel = mongoose.model('UserModel', UserSchema);

export default UserModel;
