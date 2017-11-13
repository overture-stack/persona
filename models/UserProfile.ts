import { Schema, model } from 'mongoose';

const Role = {
  type: String,
  enum: ['Patient', 'Parent', 'Clinician', 'Researcher'],
};

const UserSchema = new Schema({
  roles: {
    type: [Role],
    required: true,
  },
  city: 'string',
  bio: 'string',
});

export const UserModel = model('UserModel', UserSchema);
