import config from './config';
import * as mongoose from 'mongoose';
import { start } from './server';

mongoose.Promise = global.Promise;

const { mongoUser, mongoPass } = config;
const mongoUri = `mongodb://${encodeURIComponent(
  mongoUser,
)}:${encodeURIComponent(mongoPass)}@${config.mongoHost}/${config.mongoDb}`;

mongoose.connect(mongoUri, { useMongoClient: true });

start();
