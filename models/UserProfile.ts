import { Schema, model } from 'mongoose';

const RoleSchema = new Schema({
  type: String,
  enum: ['Patient', 'Parent', 'Clinician', 'Researcher'],
});

const UserSchema = new Schema({
  roles: {
    type: [RoleSchema],
    require: true,
  },
  city: 'string',
  bio: 'string',
});

export const UserModel = model('UserModel', UserSchema);
