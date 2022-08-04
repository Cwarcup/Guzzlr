const express = require('express');
const router  = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

// route send customer message saying order is ready for pickup
module.exports = (db) => {
  router.post('/:order_id/', (req, res) => {
    console.log("RFP ROUTE");
    console.log("[req.params.order_id]:", req.params.order_id);

    // client.messages
    //   .create({
    //     body: `Your order is ready for pickup! Come and get it now! 🤤`,
    //     from: +19896449291,
    //     to: +16043744652
    //   })
    //   .then(message => console.log(message.status))
    //   .done();

    // update  to completed in the database
    const queryText = `
      UPDATE orders
      SET order_completed = now()
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
