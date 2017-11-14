import dotenv from 'dotenv';
import * as mongoose from 'mongoose';

import { start } from './server';

dotenv.configuire();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });

start();
