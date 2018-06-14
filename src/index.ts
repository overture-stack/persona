import * as env from './config';

export { default } from './server';
export { default as vaultClient } from './services/vault';
export const config = env;
