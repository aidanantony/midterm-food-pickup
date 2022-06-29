// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = 'ACfb8a0fbd61d64864e31262aec39ce069';
console.log(accountSid);
const authToken = '9f63f961374e576f6bf25870659dd232';
console.log(authToken);
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the test message from our app',
     from: '+19783965432',
     to: '+15875728158'
   })
  .then(message => console.log(message.sid));
