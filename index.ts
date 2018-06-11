import 'babel-polyfill';

import mongoConnect from 'services/mongo';
import { retrieveMailchimpSecrets } from './services/subscriptionHandler';
import { start } from './server';

process.on('unhandledRejection', (error, p) => {
  console.error('Unhandled Rejection at: Promise', p, 'reason:', error.stack);
});

const main = async () => {
  await Promise.all([mongoConnect(), retrieveMailchimpSecrets()]);
  start();
};

main();
