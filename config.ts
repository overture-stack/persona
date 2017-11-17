import * as dotenv from 'dotenv';
import { JwtVerificationStrategy } from 'jwt';

dotenv.config();

const config = {
  jwtVerificationStrategy:
    // ts-jest limitation: https://www.npmjs.com/package/ts-jest#const-enum-is-not-supported
    process.env.JWT_VERIFICATION || ('NONE' as JwtVerificationStrategy.None),
  egoApiRoot: process.env.EGO_API,
  egoClientId: process.env.EGO_CLIENT_ID,
  egoClientSecret: process.env.EGO_CLIENT_SECRET,
  mongoHost: process.env.MONGO_HOST || 'localhost',
  mongoDb: process.env.MONGO_DB || 'test',
  mongoUser: process.env.MONGO_USER,
  mongoPass: process.env.MONGO_PASS,
};
export default config;
