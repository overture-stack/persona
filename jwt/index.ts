import config from 'config';
import memoize from 'memoizee';
import axios, { AxiosPromise } from 'axios';
import ms from 'ms';
import jwt from 'jsonwebtoken';
import urljoin from 'url-join';

export enum JwtVerificationStrategy {
  API = 'API',
  Signature = 'SIGNATURE',
  None = 'NONE',
}

interface VerifyJWT {
  (token, options?): Promise<boolean>;
}

export const dummyVerifyJWT: VerifyJWT = (
  token,
  { resolveWith } = { resolveWith: true },
) => Promise.resolve(resolveWith);

export const verifyJWTByApi: VerifyJWT = token =>
  axios
    .post(urljoin(config.egoApiRoot, '/introspect'), {
      client_id: config.egoClientId,
      client_secret: config.egoClientSecret,
    })
    .then(response => JSON.parse(response.data)) as Promise<any>;

export const getSecretOrPublicKey = () => {
  return axios
    .post(urljoin(config.egoApiRoot, '/key'), {
      client_id: config.egoClientId,
      client_secret: config.egoClientSecret,
    })
    .then(response => response.data) as Promise<any>;
};

export const getMemoizedSecretOrPublicKey = memoize(getSecretOrPublicKey, {
  maxAge: ms('3h'),
  preFetch: true,
});

export const verifyJWTBySignature: VerifyJWT = async token => {
  const secretOrPublicKey = await getMemoizedSecretOrPublicKey();
  return jwt.verify(token, secretOrPublicKey);
};

export const verifyJWT = {
  [JwtVerificationStrategy.API]: verifyJWTByApi,
  [JwtVerificationStrategy.Signature]: verifyJWTBySignature,
  [JwtVerificationStrategy.None]: dummyVerifyJWT,
}[config.jwtVerificationStrategy];
