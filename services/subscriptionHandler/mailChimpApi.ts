import * as md5 from 'crypto-js/md5';
import * as fetch from 'node-fetch';
import vault from '../vault';

// TODO: hook into global config, this is kept self-contained for easier refactoring if needed
let config = {
  vaultSecretPath: process.env.VAULT_APP_SECRET_PATH || 'secret/app',
  kfMailchimpListId: process.env.KF_MAILCHIMP_LIST_ID || '',
  kfMailchimpApiKey: process.env.KF_MAILCHIMP_API_KEY || '',
  kfMailchimpUserName: process.env.KF_MAILCHIMP_USERNAME || '',
};

export const newMailchimpSubscription = async ({ user }) => {
  const { kfMailchimpListId, kfMailchimpApiKey, kfMailchimpUserName } = config;
  const hash = md5(user.email.toLowerCase()).toString();
  const mailChimpDataCenter = kfMailchimpApiKey.split('-')[1];
  const buff = new Buffer(`${kfMailchimpUserName}:${kfMailchimpApiKey}`);
  const b64 = buff.toString('base64');
  return await fetch(
    `https://${mailChimpDataCenter}.api.mailchimp.com/3.0/lists/${kfMailchimpListId}/members/`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${b64}`,
      },
      body: JSON.stringify({
        email_address: user.email,
        status: 'subscribed',
        merge_fields: {
          FNAME: user.firstName,
          LNAME: user.lastName,
        },
      }),
    },
  ).then(res => res.json());
};

export const retrieveMailchimpSecret = () =>
  vault
    .getSecretValue(config.vaultSecretPath)
    .then(({ kfMailchimpApiKey, kfMailchimpUserName }) => {
      config = {
        ...config,
        kfMailchimpApiKey,
        kfMailchimpUserName,
      };
    })
    .catch(e => {
      console.log(
        'failed to retrieve mailchimpCredential, falling back to environment config',
      );
    });
