import 'babel-polyfill';

import mongoConnect from 'services/mongo';
import { retrieveMailchimpSecret } from './services/subscriptionHandler';
import { start } from './server';

process.on('unhandledRejection', (error, p) => {
  console.error('Unhandled Rejection at: Promise', p, 'reason:', error.stack);
});

const main = async () => {
  await Promise.all([mongoConnect(), retrieveMailchimpSecret()]);
  start();
};

main();
