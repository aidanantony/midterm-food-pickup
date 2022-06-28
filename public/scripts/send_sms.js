// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
// const accountSid = 'ACfb8a0fbd61d64864e31262aec39ce069';
// console.log(accountSid);
// const authToken = '9f63f961374e576f6bf25870659dd232';
// console.log(authToken);
require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendMessageToClient = function(messageForReceiver, receiverPhoneNumber) {
  return client.messages
    .create({
      body: messageForReceiver,
      from: '+19895597184',
      to: receiverPhoneNumber
    })
    .then(message => console.log(message.sid));
};

module.exports = { sendMessageToClient };
