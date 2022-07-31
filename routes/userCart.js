const express = require('express');
const router  = express.Router();

// TODO: return a users current order
// @adam
// code inside is for placeholder and testing route
module.exports = (db) => {
  router.get('/', (req, res) => {
    db.query(
      `
      SELECT *
      FROM orders
      WHERE user_id = 1;
  `)
      .then(data => {
        const userCart = data.rows;
        res.json({ userCart });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};