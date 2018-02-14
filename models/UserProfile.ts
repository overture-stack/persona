import { Schema, model } from 'mongoose';

const Role = {
  type: String,
  enum: ['Patient', 'Parent', 'Clinician', 'Researcher'],
};

const UserSchema = new Schema({
  egoId: {
    type: 'String',
    required: true,
    unique: true,
  },
  firstName: 'String',
  lastName: 'String',
  roles: [Role],
  city: 'string',
  bio: 'string',
  acceptedTerms: { type: 'boolean', default: false }
});

export const UserModel = model('UserModel', UserSchema);
