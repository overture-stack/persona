import { Schema, model } from 'mongoose';

const Role = {
  type: String,
  enum: ['Patient', 'Parent', 'Clinician', 'Researcher'],
};

const UserSchema = new Schema({
  ego_id: {
    type: 'String',
    required: true,
    unique: true,
  },
  first_name: 'String',
  last_name: 'String',
  roles: [Role],
  city: 'string',
  bio: 'string',
});

export const UserModel = model('UserModel', UserSchema);
