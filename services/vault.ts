import config from '../config';
const vaultAwsAuth = require('vault-auth-aws');

const options = {
  apiVersion: 'v1',
  endpoint: config.vaultEndpoint,
  token: config.vaultToken,
};

let vault: any = null;

const getSecretValue = async secretPath => {
  if (vault !== null) {
    return vault.read(secretPath).then(res => res.data);
  } else {
    console.log('vaultAuthentication: ', config.vaultAuthentication);
    if (config.vaultAuthentication === 'AWS_IAM') {
      // vault = require('node-vault')(options);
      return new vaultAwsAuth({ host: options.endpoint })
        .authenticate()
        .then(success => {
          vault = require('node-vault')({
            ...options,
            token: success.auth.client_token,
          });
          return getSecretValue(secretPath);
        });
    } else {
      vault = require('node-vault')(options);
      return getSecretValue(secretPath);
    }
  }
};

export default {
  getSecretValue,
};
