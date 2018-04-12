import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  mongoHost: process.env.MONGO_HOST || 'localhost',
  mongoDb: process.env.MONGO_DB || 'test',
  mongoUser: process.env.MONGO_USER,
  mongoPass: process.env.MONGO_PASS,

  vaultEndpointProtocal: process.env.VAULT_ENDPOINT_PROTOCAL,
  vaultHost: process.env.VAULT_HOST,
  vaultPort: process.env.VAULT_PORT,
  vaultApiVersion: process.env.VAULT_API_VERSION,

  vaultToken: process.env.VAULT_TOKEN,
  vaultAuthentication: process.env.VAULT_AUTHENTICATION,
  awsIamRole: process.env.AWS_IAM_ROLE,
  vaultMongoCredentialPath: process.env.VAULT_MONGO_CREDENTIAL_PATH,
  mongoUserNameKey: process.env.MONGO_USERNAME_KEY || 'mongodb-username',
  mongoUserNameKey: process.env.MONGO_USERPASS_KEY || 'mongodb-pass',
};

export default config;
