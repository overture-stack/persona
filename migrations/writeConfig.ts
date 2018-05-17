import * as fs from 'fs';

import { constructMongoUri } from '../services/mongo';
import { mongoDb } from '../config';

const outFile = process.env.OUT_FILE;
const migrationsDir = 'migrations';
const changelogCollectionName = 'changelog';

const writeConfigFile = async () => {
  const mongoUri = await constructMongoUri({ includeDb: false });
  const outStr = `
    'use-strict';

    module.exports = {
      mongodb: {
        url: '${mongoUri}',
        databaseName: '${mongoDb}',
      },
      migrationsDir: '${migrationsDir}',
      changelogCollectionName: '${changelogCollectionName}',
    }
  `;
  fs.writeFileSync(outFile || ``, outStr || ``);
};

writeConfigFile();
