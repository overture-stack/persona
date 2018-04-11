import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  mongoHost: process.env.MONGO_HOST || 'localhost',
  mongoDb: process.env.MONGO_DB || 'test',
  mongoUser: process.env.MONGO_USER,
  mongoPass: process.env.MONGO_PASS,
  vaultEndpoint: process.env.VAULT_ADDR,
  vaultToken: process.env.VAULT_TOKEN,
  vaultAuthentication: process.env.VAULT_AUTHENTICATION,
  vaultMongoCredentialPath: process.env.VAULT_MONGO_CREDENTIAL_PATH,
};

export default config;
