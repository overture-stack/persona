import * as path from 'path';
import * as fs from 'fs';
import * as child_process from 'child_process';

import { constructMongoUri } from '../../../services/mongo';
import { mongoDb } from '../../../config';
import { isInstalled, rimRaf } from '../../utils';

const MIGRATIONS_DIR = 'migrations';
const CHANGELOG_COLLECTION_NAME = 'changelog';

const migrate = async args => {
  if (!await isInstalled('migrate-mongo')) {
    return console.error(
      `migrate-mongo must be globally installed to run migrations. 'npm install -g migrate-mongo'`,
    );
  }
  const migrationsRoot = path.join(process.cwd(), MIGRATIONS_DIR);
  const migrationsDist = path.join(migrationsRoot, 'dist');
  const configFilePath = path.join(migrationsDist, 'config.js');

  try {
    if (!fs.existsSync(migrationsDist)) fs.mkdirSync(migrationsDist);

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
    rimRaf(migrationsDist);
    throw err;
  }
};

export default migrate;
