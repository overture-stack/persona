#!/usr/bin/env node

import { isInstalled } from './utils';

const main = async () => {
  if (!await isInstalled('migrate-mongo')) {
    console.warn(
      'persona WARN: migrate-mongo must be installed globally to use persona migrations',
    );
  }
};

main();
