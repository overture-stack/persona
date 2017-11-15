import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';

import { start } from './server';

dotenv.config();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });

start();
