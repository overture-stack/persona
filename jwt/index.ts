import config from 'config';
import axios, { AxiosPromise } from 'axios';
import jwt from 'jsonwebtoken';
import urljoin from 'url-join';

export enum JwtVerificationStrategy {
  API = 'API',
  Signature = 'SIGNATURE',
  None = 'NONE',
}

interface VerifyJWT {
  (token): Promise<boolean> | AxiosPromise<boolean>;
}

export const dummyVerifyJWT: VerifyJWT = token => Promise.resolve(true);

export const verifyJWTByApi: VerifyJWT = token =>
  axios.post(urljoin(config.egoApiRoot, '/introspect'), {
    client_id: config.egoClientId,
    client_secret: config.egoClientSecret,
  });

export const getJwtVerificationKey = () => {
  return axios
    .post(urljoin(config.egoApiRoot, '/key'), {
      client_id: config.egoClientId,
      client_secret: config.egoClientSecret,
    })
    .then(response => console.log(response.data));
};

export const verifyJWTBySignature: VerifyJWT = async token => {
  const secretOrPublicKey = await getJwtVerificationKey();
  return jwt.verify(token, secretOrPublicKey);
};

export const verifyJWT = {
  [JwtVerificationStrategy.API]: verifyJWTByApi,
  [JwtVerificationStrategy.Signature]: verifyJWTBySignature,
  [JwtVerificationStrategy.None]: dummyVerifyJWT,
}[config.jwtVerificationStrategy];
