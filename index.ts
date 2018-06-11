import 'babel-polyfill';

import mongoConnect from 'services/mongo';
import {
  retrieveMailchimpSecrets,
  retrieveEmailSecrets,
} from './services/subscriptionHandler';
import { start } from './server';

process.on('unhandledRejection', (error, p) => {
  console.error('Unhandled Rejection at: Promise', p, 'reason:', error.stack);
});

const main = async () => {
  await Promise.all([
    mongoConnect(),
    retrieveMailchimpSecrets(),
    retrieveEmailSecrets(),
  ]);
  start();
};

main();
