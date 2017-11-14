import dotenv from 'dotenv';
import moxios from 'moxios';
import urljoin from 'url-join';
import config from 'config';

import {
  dummyVerifyJWT,
  verifyJWTByApi,
  getJwtVerificationKey,
  verifyJWTBySignature,
} from '../';

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
  const jwtApiPath = urljoin(config.egoApiRoot, '/introspect');
  moxios.stubRequest(jwtApiPath, {
    status: 200,
    responseText: 'true',
  });

  await expect(verifyJWTByApi(token)).resolves.toEqual(true);
  moxios.uninstall();
});
