import * as moxios from 'moxios';
import * as urlJoin from 'url-join';
import config from 'config';
import * as jwt from 'jsonwebtoken';

import { dummyVerifyJWT, verifyJWTByApi, verifyJWTBySignature } from '../';

const token = 'adsfasdf';

test('dummyVerifyJWT should resolve `true` by default, or whatever we tell it to', () => {
  expect.assertions(3);
  return Promise.all([
    expect(dummyVerifyJWT(token)).resolves.toEqual(true),
    expect(dummyVerifyJWT(token, { resolveWith: true })).resolves.toEqual(true),
    expect(dummyVerifyJWT(token, { resolveWith: false })).resolves.toEqual(
      false,
    ),
  ]);
});

test('verifyJWTByApi should resolve with the parsed boolean response from the jwtApi', async () => {
  expect.assertions(1);

  moxios.install();
  const jwtApiPath = urlJoin(config.egoApiRoot, '/introspect');
  moxios.stubRequest(jwtApiPath, {
    status: 200,
    responseText: 'true',
  });

  await expect(verifyJWTByApi(token)).resolves.toEqual(true);
  moxios.uninstall();
});

test('verify jwt via signature from api', async () => {
  expect.assertions(1);
  const secretOrPublicKey = 'secret';
  const payload = {};
  const token = jwt.sign(payload, secretOrPublicKey);

  moxios.install();
  const jwtApiPath = urlJoin(config.egoApiRoot, '/key');
  moxios.stubRequest(jwtApiPath, {
    status: 200,
    responseText: secretOrPublicKey,
  });
  await expect(verifyJWTBySignature(token)).resolves.toBeTruthy();

  moxios.uninstall();
});
