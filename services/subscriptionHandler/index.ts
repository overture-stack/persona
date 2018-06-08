import { newMailchimpSubscription } from './mailChimpApi';

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

export { retrieveMailchimpSecret } from './mailChimpApi';
