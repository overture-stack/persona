import 'babel-polyfill';
import config from './config';
import * as mongoose from 'mongoose';
import vault from './services/vault';

mongoose.Promise = global.Promise;

const connectToMongoAndStart = ({ mongoUser, mongoPass }) => {
  const mongoUri = `mongodb://${
    mongoUser && mongoPass
      ? `${encodeURIComponent(mongoUser)}:${encodeURIComponent(mongoPass)}@`
      : ''
  }${config.mongoHost}/${config.mongoDb}`;

  return mongoose.connect(mongoUri, { useMongoClient: true }, error => {
    if (error) {
      console.error('Error Connecting to mongo', error);
      return;
    }
    console.log(
      `Connected to mongo at mongodb://${config.mongoHost}/${config.mongoDb}`,
    );
    require('./server').start();
  });
};

if (config.vaultMongoCredentialPath) {
  vault
    .getSecretValue(config.vaultMongoCredentialPath)
    .then(result => {
      connectToMongoAndStart({
        mongoUser: result[config.mongoUsernameKey],
        mongoPass: result[config.mongoUserpassKey],
      });
    })
    .catch(error => console.log(error));
} else {
  connectToMongoAndStart({
    mongoUser: config.mongoUser,
    mongoPass: config.mongoPass,
  });
}

process.on('unhandledRejection', (error, p) => {
  console.error('Unhandled Rejection at: Promise', p, 'reason:', error.stack);
});
