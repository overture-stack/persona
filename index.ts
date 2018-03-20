import 'babel-polyfill';
import config from './config';
import * as mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const { mongoUser, mongoPass } = config;
const mongoUri = `mongodb://${
  mongoUser && mongoPass
    ? `${encodeURIComponent(mongoUser)}:${encodeURIComponent(mongoPass)}@`
    : ''
}${config.mongoHost}/${config.mongoDb}`;

mongoose.connect(mongoUri, { useMongoClient: true }, error => {
  if (error) {
    console.error('Error Connecting to mongo', error);
    return;
  }
  console.log(
    `Connected to mongo at mongodb://${config.mongoHost}/${config.mongoDb}`,
  );
});

require('./server').start();

process.on('unhandledRejection', (error, p) => {
  console.error('Unhandled Rejection at: Promise', p, 'reason:', error.stack);
});
