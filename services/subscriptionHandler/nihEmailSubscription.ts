import * as nodemailer from 'nodemailer';
import vault from '../vault';

const vaultSecretPath = process.env.VAULT_APP_SECRET_PATH || 'secret/app';
const nihSubscriptionMailTargetAddress =
  process.env.NIH_SUBSCRIPTION_MAIL_TARGET_ADDRESS;

let config = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    type: 'PLAIN',
    user: process.env.NIH_SUBSCRIPTION_MAIL_USERNAME, // generated ethereal user
    pass: process.env.NIH_SUBSCRIPTION_MAIL_PASS, // generated ethereal password
  },
};

export const sendNihSubscriptionEmail = async ({ user }) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport(config);
    const { email, firstName, lastName } = user;
    const mailOptions = {
      from: `"Kids First DRP " <${nihSubscriptionMailTargetAddress}>`, // sender address
      to: process.env.NIH_SUBSCRIPTION_MAIL_TARGET_ADDRESS, // list of receivers
      subject: 'Kids First DRP Registration', // Subject line
      text: `Full User Name: ${firstName} ${lastName}
      User Email: ${email}
      Date Opted IN: ${new Date().toString()}
      Source = Kids First DRP Registration`, // plain text body
    };
    console.log('mailOptions: ', mailOptions);
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });
};

export const retrieveEmailSecrets = () =>
  vault
    .getSecretValue(vaultSecretPath)
    .then(({ nihSubscriptionMailUsername, nihSubscriptionMailPass }) => {
      config = {
        ...config,
        auth: {
          ...config.auth,
          user: nihSubscriptionMailUsername,
          pass: nihSubscriptionMailPass,
        },
      };
    })
    .catch(e => {
      console.log(
        'failed to retrieve nih email credentials, falling back to environment config',
      );
    });
