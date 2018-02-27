import { Schema, model } from 'mongoose';

const Role = {
  type: String,
  enum: ['researcher', 'patient', 'clinician', 'advocacygroup'],
};

const UserSchema = new Schema({
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
});

export const UserModel = model('UserModel', UserSchema);
