import vaultAuthAws from 'vault-auth-aws';
import vault from 'node-vault';
import {
  awsIamRole,
  vaultAuthentication,
  vaultApiVersion,
  vaultEndpointProtocol,
  vaultHost,
  vaultPort,
  vaultToken,
} from '../config';

const options = {
  apiVersion: vaultApiVersion,
  endpoint: `${vaultEndpointProtocol}://${vaultHost}:${vaultPort}`,
  token: vaultToken,
};

let vaultClient: any = null;

const getSecretValue = async secretPath => {
  if (vaultClient !== null) {
    return vaultClient.read(secretPath).then(res => res.data);
  } else {
    if (vaultAuthentication === 'AWS_IAM') {
      return new vaultAuthAws({
        host: vaultHost,
        vaultAppName: awsIamRole,
        port: vaultPort,
        ssl: vaultEndpointProtocol === 'https',
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

export default { getSecretValue };
