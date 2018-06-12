import * as dotenv from 'dotenv';

dotenv.config();

export const egoApi = process.env.EGO_API;

export const mongoHost = process.env.MONGO_HOST || 'localhost';
export const mongoDb = process.env.MONGO_DB || 'test';
export const mongoUser = process.env.MONGO_USER;
export const mongoPass = process.env.MONGO_PASS;

export const vaultEndpointProtocol = process.env.VAULT_ENDPOINT_PROTOCOL;
export const vaultHost = process.env.VAULT_HOST;
export const vaultPort = process.env.VAULT_PORT;
export const vaultApiVersion = process.env.VAULT_API_VERSION;
export const vaultToken = process.env.VAULT_TOKEN;
export const vaultAuthentication = process.env.VAULT_AUTHENTICATION;
export const vaultAwsIamRole = process.env.AWS_IAM_ROLE;
export const vaultMongoCredentialPath = process.env.VAULT_MONGO_CREDENTIAL_PATH;
export const vaultMongoUsernameKey =
  process.env.MONGO_USERNAME_KEY || 'mongodb-username';
export const vaultMongoUserpassKey =
  process.env.MONGO_USERPASS_KEY || 'mongodb-pass';
