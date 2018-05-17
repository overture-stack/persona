import {
  mongoUsernameKey,
  mongoUserpassKey,
  vaultMongoCredentialPath,
  mongoUser,
  mongoPass,
  mongoHost,
  mongoDb,
} from '../config';

import vault from './vault';
import mongoose from './mongoose';

export const getMongoCredentials = async () => {
  return vaultMongoCredentialPath
    ? await vault.getSecretValue(vaultMongoCredentialPath).then(r => ({
        user: r[mongoUsernameKey],
        pass: r[mongoUserpassKey],
      }))
    : { user: mongoUser, pass: mongoPass };
};

export const constructMongoUri = async ({ includeDb = true } = {}) => {
  const { user, pass } = await getMongoCredentials();
  return `mongodb://${
    user && pass
      ? `${encodeURIComponent(user)}:${encodeURIComponent(pass)}@`
      : ''
  }${mongoHost}${includeDb ? `/${mongoDb}` : ``}`;
};

const connect = () =>
  new Promise(async (resolve, reject) => {
    const mongoUri = await constructMongoUri();
    mongoose.connect(mongoUri, { useMongoClient: true }, err => {
      if (err) {
        console.error('Error Connecting to mongo', err);
        reject(err);
      } else {
        console.log(`Connected to mongo at mongodb://${mongoHost}/${mongoDb}`);
        resolve();
      }
    });
  });

export default connect;
