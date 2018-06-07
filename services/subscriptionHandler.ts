import * as md5 from 'crypto-js/md5';
import * as fetch from 'node-fetch';
import vault from './vault';

const newMailchimpSubscription = async ({ user }) => {
  // mailchimp configs. bypassing env.js so it's easier to move around later
  const kfMailchimpListId = process.env.KF_MAILCHIMP_LIST_ID || '';
  const kfMailchimpApiKey = process.env.KF_MAILCHIMP_API_KEY || '';
  const kfMailchimpUserName = process.env.KF_MAILCHIMP_USERNAME || '';

  const hash = md5(user.email.toLowerCase()).toString();
  const mailChimpDataCenter = kfMailchimpApiKey.split('-')[1];
  const buff = new Buffer(`${kfMailchimpUserName}:${kfMailchimpApiKey}`);
  const b64 = buff.toString('base64');
  const response = await fetch(
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
  console.log('response: ', response);
};

const sendNihSubscriptionEmail = async ({ user }) => {
  // nih email configs
  const nihEmail = process.env.NIH_SUBSCRIPTION_EMAIL;
};

export default () => async (req, res) => {
  const { user = {} } = req.body;
  const { acceptedKfOptIn, acceptedNihOptIn } = user;

  if (acceptedKfOptIn) {
    await newMailchimpSubscription({ user });
  }
  if (acceptedNihOptIn) {
    sendNihSubscriptionEmail({ user });
  }
  res.end();
};
