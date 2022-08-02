const express = require('express');
const router  = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

// sends a message to the owner of the restaurant when an order is placed.
// not hooked up to the button yet.
module.exports = () => {
  router.post('/', (req, res) => {
    // test the route by sending back to client hello world
    client.messages
      .create({
        body: 'An order has come in. Please log into Guzzlr to view the order.',
        from: '+19896449291',
        to: '+16043744652'
      })
      .then(message => console.log(message.status))
      .done();
    res.send('Message Sent');

  });
  return router;
};
