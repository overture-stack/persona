import { JwtVerificationStrategy } from 'jwt';

const config = {
  jwtVerificationStrategy:
    process.env.JWT_VERIFICATION || JwtVerificationStrategy.None,
  egoApiRoot: process.env.EGO_API,
  egoClientId: process.env.EGO_CLIENT_ID,
  egoClientSecret: process.env.EGO_CLIENT_SECRET,
};
export default config;
