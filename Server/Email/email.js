const { createTransport } = require('nodemailer');
require('dotenv').config();

const email = process.env.EMAIL_HOST_USER;
const appPassword = process.env.EMAIL_HOST_APP_PASSWORD;

// Configure the email transport
const emailConfig = {
  service: 'Gmail',
  auth: {
    user: email,
    pass: appPassword,
  },
  tls: {
    rejectUnauthorized: true,// set to false when testing in development
  },
};

const transporter = createTransport(emailConfig);

module.exports = transporter;
