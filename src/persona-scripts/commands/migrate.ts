import * as path from 'path';
import * as fs from 'fs';
import * as child_process from 'child_process';

import { constructMongoUri } from '../../services/mongo';
import { mongoDb } from '../../config';
import { isInstalled, rimRaf } from './utils';

const MIGRATIONS_DIR = 'migrations';
const CHANGELOG_COLLECTION_NAME = 'changelog';

const migrate = async args => {
  if (!await isInstalled('migrate-mongo')) {
    return console.error(
      `migrate-mongo must be globally installed to run migrations. 'npm install -g migrate-mongo'`,
    );
  }
  const migrationsRoot = path.join(process.cwd(), 'migrations');
  const migrationsDist = path.join(migrationsRoot, 'dist');
  const configFilePath = path.join(migrationsDist, 'config.js');
  const migrationsMigrationPath = path.join(migrationsRoot, MIGRATIONS_DIR);

  try {
    if (!fs.existsSync(migrationsRoot)) fs.mkdirSync(migrationsRoot);
    if (!fs.existsSync(migrationsMigrationPath))
      fs.mkdirSync(migrationsMigrationPath);
    if (fs.existsSync(migrationsDist)) rimRaf(migrationsDist);
    fs.mkdirSync(migrationsDist);

    const mongoUri = await constructMongoUri({ includeDb: false });
    const outStr = `
    'use-strict';

    module.exports = {
      mongodb: {
        url: '${mongoUri}',
        databaseName: '${mongoDb}',
      },
      migrationsDir: '${MIGRATIONS_DIR}',
      changelogCollectionName: '${CHANGELOG_COLLECTION_NAME}',
    }
  `;
    fs.writeFileSync(configFilePath || ``, outStr || ``);

    const migrateArgs = ['-f', configFilePath, ...args.split(' ')];

    console.log(
      `Running "migrate-mongo" with arguments: `,
      JSON.stringify(migrateArgs),
    );

    await child_process.spawnSync('migrate-mongo', migrateArgs, {
      cwd: migrationsRoot,
      stdio: 'inherit',
    });
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    if (fs.existsSync(migrationsDist)) rimRaf(migrationsDist);
  }
};

export default migrate;
