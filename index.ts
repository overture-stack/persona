import config from './config';
import * as mongoose from 'mongoose';
import { start } from './server';

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${config.mongoHost}/${config.mongoDb}`, {
  useMongoClient: true,
  user: config.mongoUser,
  pass: config.mongoPass,
});

start();
