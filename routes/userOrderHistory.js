const express = require('express');
const router  = express.Router();

// have hard coded user id for now = 1
// TODO: dynamic user id
// TODO: create query with orders and menu_items
module.exports = (db) => {
  router.get('/', (req, res) => {
    db.query(
      `
      SELECT
        *
      FROM
        orders
        JOIN users ON user_id = users.id
      WHERE
        user_id = 1;
  `)
      .then(data => {
        const userOrderHistory = data.rows;
        res.json({ userOrderHistory });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};