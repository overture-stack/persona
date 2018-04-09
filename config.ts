import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  mongoHost: process.env.MONGO_HOST || 'localhost',
  mongoDb: process.env.MONGO_DB || 'test',
  mongoUser: process.env.MONGO_USER,
  mongoPass: process.env.MONGO_PASS,
  vaultEndpoint: process.env.VAULT_ENDPOINT,
  vaultToken: process.env.VAULT_TOKEN,
  vaultAuthentication: process.env.VAULT_AUTHENTICATION,
};

export default config;
