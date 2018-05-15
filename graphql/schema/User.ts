import { composeWithMongoose } from 'graphql-compose-mongoose';

import UserModel from 'models/User';

const UserTC = composeWithMongoose(UserModel, {});

export default UserTC;
