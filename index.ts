import 'babel-polyfill';

import connect from 'services/mongo';
import { start } from './server';

process.on('unhandledRejection', (error, p) => {
  console.error('Unhandled Rejection at: Promise', p, 'reason:', error.stack);
});

const main = async () => {
  await connect();
  start();
};

main();
