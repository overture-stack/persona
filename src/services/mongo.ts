import mongoose from './mongoose';
import vaultClient from './vault';

import {
  useVault,
  vaultMongoCredentialPath,
  vaultMongoUsernameKey,
  vaultMongoUserpassKey,
  mongoHost,
  mongoDb,
  mongoUser,
  mongoPass,
} from '../config';

export const getMongoCredentials = async () => {
  if (useVault) {
    const client = await vaultClient();
    const { data } = await client.read(vaultMongoCredentialPath);
    return {
      user: data[vaultMongoUsernameKey],
      pass: data[vaultMongoUserpassKey],
    };
  } else {
    return { user: mongoUser, pass: mongoPass };
  }
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
    const uri = await constructMongoUri();
    mongoose.connect(uri, { useMongoClient: true }, err => {
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
