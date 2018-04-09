import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  mongoHost: process.env.MONGO_HOST || 'localhost',
  mongoDb: process.env.MONGO_DB || 'test',
  mongoUser: process.env.MONGO_USER,
  mongoPass: process.env.MONGO_PASS,
};
export default config;
