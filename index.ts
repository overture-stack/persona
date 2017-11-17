import config from './config';
import * as mongoose from 'mongoose';
import { start } from './server';

mongoose.Promise = global.Promise;

const { mongoUser, mongoPass } = config;
const mongoUri = `mongodb://${mongoUser && mongoPass
  ? `${encodeURIComponent(mongoUser)}:${encodeURIComponent(mongoPass)}@`
  : ''}${config.mongoHost}/${config.mongoDb}`;

mongoose.connect(mongoUri, { useMongoClient: true }, error => {
  if (error) {
    console.error('Error Connecting to mongo', error);
    return;
  }
  console.log(
    `Connected to mongo at mongodb://${config.mongoHost}/${config.mongoDb}`,
  );
});

start();
