const express = require('express');
const router  = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

module.exports = () => {
  router.get('/', (req, res) => {
    // test the route by sending back to client hello world
    client.messages
      .create({
        body: 'Learn to code you twat 🙃',
        from: '+19896449291',
        to: '+16043744652'
      })
      .then(message => console.log(message.status))
      .done();
    res.send('Message Sent');

  });
  return router;
};
