import * as mongoose from 'mongoose';

import { start } from './server';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });

start();
