import config from '../config';
const vaultAwsAuth = require('vault-auth-aws');
const vault = require('node-vault');

const options = {
  apiVersion: 'v1',
  endpoint: config.vaultEndpoint,
  token: config.vaultToken,
};

let vaultClient: any = null;

const getSecretValue = async secretPath => {
  console.log(config.awsIamRole);
  if (vaultClient !== null) {
    return vaultClient.read(secretPath).then(res => res.data);
  } else {
    if (config.vaultAuthentication === 'AWS_IAM') {
      // vault = require('node-vault')(options);
      return new vaultAwsAuth({
        host: options.endpoint,
        vaultAppName: config.awsIamRole,
      })
        .authenticate()
        .then(success => {
          vaultClient = vault({
            ...options,
            token: success.auth.client_token,
          });
          return getSecretValue(secretPath);
        });
    } else {
      vaultClient = vault(options);
      return getSecretValue(secretPath);
    }
  }
};

export default {
  getSecretValue,
};
