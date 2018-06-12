#!/usr/bin/env node

import * as parseArgs from 'minimist';
import commands from './commands';

const main = async () => {
  const command = process.argv[2];
  const { args } = parseArgs(process.argv.slice(3), {
    string: ['args'],
    alias: { a: ['args'] },
    defaults: { args: '' },
  });

  if (!command || !commands[command]) {
    return console.error(
      `Command not found. Valid commands include '${Object.keys(commands).join(
        ', ',
      )}'`,
    );
  }

  await commands[command](args);
};

main();
