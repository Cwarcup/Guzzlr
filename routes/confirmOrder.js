const express = require('express');
const router  = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

// route to send text message to user from the owner dashboard
// data is attached at the login process if the user is an owner
// can be found in the setTimeout function in public/scripts/app.js
module.exports = (db) => {
  router.post('/:order_id', (req, res) => {

    const { time, confirmOrder } = req.body;

    if (confirmOrder === "decline") {

      // set order values to null if order is declined
      const queryText = `
      UPDATE orders
      SET order_started = null,
          order_completed = null,
          pickup_time = null
      WHERE id = $1;
      `;
      db.query(queryText, [req.params.order_id])
        .then(result => {
          console.log("Order has been declined");
        })
        .catch(err => {
          console.log('err:', err);
          res.json(err);
        });
      
      // SMS to customer stating that order has been declined
      return client.messages
        .create({
          body: `Your order has been DECLINE! Please call the restaurant and reschedule your order.`,
          from: +19896449291, // twilio number from which text will be sent
          to: +16043744652 // user's phone number
        })
        .then(message => console.log(message.status))
        .then(res.sendStatus(200))
        .done();
    }

    // happy path, order is accepted by owner
    client.messages
      .create({
        body: `Your order has been confirmed! Pickup time is ${time}`,
        from: +19896449291,
        to: +16043744652
      })
      .then(message => console.log(message.status))
      .done();

    // update order status to completed in the database
    const queryText = `
      UPDATE orders
      SET order_started = now(),
          pickup_time = '${time}'
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
