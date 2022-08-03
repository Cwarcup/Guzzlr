const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    db.query(
      `
      SELECT * from orders ORDER BY orders.id DESC LIMIT 1;
      `
    )
      .then(data => {
        let order = data.rows[0];
        db.query(
          `
          SELECT order_items.*, orders.*, orders.price as order_total, menu_items.name as food_name, menu_items.*, restaurants.name as restaurant, restaurants.* FROM order_items JOIN orders ON order_items.order_id = orders.id LEFT JOIN restaurants ON orders.restaurant_id = restaurants.id JOIN menu_items ON order_items.menu_item = menu_items.id WHERE order_id = ${order.id};
          `
        )
        .then(data => {
          let out = data.rows;
          res.json({ out })
        })
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
