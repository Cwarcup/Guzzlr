const express = require('express');
const router  = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

module.exports = (db) => {
  router.post('/:order_id', (req, res) => {

    const { time, confirmOrder } = req.body;

    
    if (confirmOrder === "decline") {
      
      return client.messages
        .create({
          body: `Your order has been DECLINE! Please call the restaurant and reschedule your order.`,
          from: +19896449291,
          to: +16043744652
        })
        .then(message => console.log(message.status))
        .done();
    }

    client.messages
      .create({
        body: `Your order has been confirmed! Pickup time is ${time}`,
        from: +19896449291,
        to: +16043744652
      })
      .then(message => console.log(message.status))
      .done();

    const queryText = `
      UPDATE orders
      SET order_started = now()
      WHERE id = $1;
      `;
    db.query(queryText, [req.params.order_id])
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => {
        console.log('err:', err);
        res.json(err);
      });
  });

  return router;
};
