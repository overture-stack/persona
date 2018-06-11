import * as vaultAuthAws from 'vault-auth-aws';
import * as vault from 'node-vault';

import {
  vaultEndpointProtocol,
  vaultHost,
  vaultPort,
  vaultApiVersion,
  vaultToken,
  vaultAuthentication,
  vaultAwsIamRole,
  vaultMongoCredentialPath,
  vaultMongoUsernameKey,
  vaultMongoUserpassKey,
} from '../config';

const getCredentials = async () => {
  if (!vaultMongoCredentialPath) return false;

  const token =
    vaultAuthentication === 'AWS_IAM'
      ? await new vaultAuthAws({
          host: vaultHost,
          vaultAppName: vaultAwsIamRole,
          port: vaultPort,
          ssl: vaultEndpointProtocol === 'https',
        })
          .authenticate()
          .then(r => r.auth.client_token)
      : vaultToken;

  const client = vault({
    apiVersion: vaultApiVersion,
    endpoint: `${vaultEndpointProtocol}://${vaultHost}:${vaultPort}`,
    token,
  });

  const { data } = await client.read(vaultMongoCredentialPath);

  return {
    user: data[vaultMongoUsernameKey],
    pass: data[vaultMongoUserpassKey],
  };
};

export default getCredentials;
