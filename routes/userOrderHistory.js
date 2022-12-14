const express = require('express');
const router  = express.Router();

// have hard coded user id for now = 1
// TODO: returning all the same prices for now
module.exports = (db) => {
  router.get('/', (req, res) => {
    console.log('get all orders', req.query);
    console.log("req.body", req.body);
    const queryText = `
      SELECT
        orders.id as order_id,
        orders.order_placed,
        orders.price as order_total,
        orders.*,
        restaurants.name as restaurant,
        restaurants.*,
        menu_items.price,
        menu_items.name,
        menu_items.id as menu_item_id,
        count(menu_items.name)
      FROM
        orders
        JOIN users ON user_id = users.id
        JOIN restaurants ON restaurant_id = restaurants.id
        JOIN order_items ON order_id = orders.id
        JOIN menu_items ON order_items.menu_item = menu_items.id
      WHERE
        user_id = $1
      GROUP BY
        orders.id,
        restaurants.name,
        restaurants.id,
        order_total,
        orders.order_placed,
        menu_items.name,
        menu_items.id,
        menu_items.price;
    `;
    const userId = parseInt(req.query.userId);
    const values = [userId];
    db.query(queryText, values)
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
