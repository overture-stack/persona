import { JwtVerificationStrategy } from 'jwt';

const config = {
  jwtVerificationStrategy:
    // ts-jest limitation: https://www.npmjs.com/package/ts-jest#const-enum-is-not-supported
    process.env.JWT_VERIFICATION || ('NONE' as JwtVerificationStrategy.None),
  egoApiRoot: process.env.EGO_API,
  egoClientId: process.env.EGO_CLIENT_ID,
  egoClientSecret: process.env.EGO_CLIENT_SECRET,
};
export default config;
