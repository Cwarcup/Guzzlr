const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post('/:order_id', (req, res) => {

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
