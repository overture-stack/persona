import config from '../config';
const vaultAwsAuth = require('vault-auth-aws');
const vault = require('node-vault');

const options = {
  apiVersion: config.vaultApiVersion,
  endpoint: `${config.vaultEndpointProtocal}://${config.vaultHost}:${
    config.vaultPort
  }`,
  token: config.vaultToken,
};

let vaultClient: any = null;

const getSecretValue = async secretPath => {
  console.log(config.awsIamRole);
  if (vaultClient !== null) {
    return vaultClient.read(secretPath).then(res => res.data);
  } else {
    if (config.vaultAuthentication === 'AWS_IAM') {
      return new vaultAwsAuth({
        host: config.vaultHost,
        vaultAppName: config.awsIamRole,
        port: config.vaultPort,
        ssl: config.vaultEndpointProtocal === 'https',
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
