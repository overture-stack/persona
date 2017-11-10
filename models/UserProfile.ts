const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  type: String,
  enum: ['Patient', 'Parent', 'Clinician', 'Researcher'],
});

const UserSchema = new mongoose.Schema({
  roles: {
    type: [RoleSchema],
    require: true,
  },
  city: 'string',
  bio: 'string',
});

const UserModel = mongoose.model('UserModel', UserSchema);
