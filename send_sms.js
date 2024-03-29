// const path = require("path");
// const PATH = path.resolve(__dirname, "./.env");
// require("dotenv").config({ path: PATH });
// console.log(process.env);

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
