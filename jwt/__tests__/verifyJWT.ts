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
