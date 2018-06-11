import { newMailchimpSubscription } from './mailChimpApi';
import { sendNihSubscriptionEmail } from './nihEmailSubscription';

export default () => async (req, res) => {
  const { user = {} } = req.body;
  const { acceptedKfOptIn, acceptedNihOptIn } = user;

  if (acceptedKfOptIn) {
    await newMailchimpSubscription({ user });
  }
  if (acceptedNihOptIn) {
    await sendNihSubscriptionEmail({ user });
  }
  res.end();
};

export { retrieveMailchimpSecrets } from './mailChimpApi';
export { retrieveEmailSecrets } from './nihEmailSubscription';
