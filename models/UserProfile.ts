const Role = {
  type: String,
  enum: ['research', 'community', 'health'],
};

let userModel: any = null;

export const CreateUserModel = () => {
  if (userModel) {
    return userModel;
  }

  const mongoose = require('mongoose');

  const UserSchema = new mongoose.Schema({
    //ego fields
    egoId: {
      type: 'String',
      required: true,
      unique: true,
    },
    email: 'String',

    acceptedTerms: 'boolean',

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
  });

  userModel = mongoose.model('UserModel', UserSchema);

  return userModel;
};
