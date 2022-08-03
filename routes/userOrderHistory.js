const express = require('express');
const router  = express.Router();

// have hard coded user id for now = 1
// TODO: returning all the same prices for now
module.exports = (db) => {
  router.get('/', (req, res) => {
    const queryText = `
      SELECT
        orders.id as order_id,
        orders.order_placed,
        restaurants.name as restaurant,
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
        orders.order_placed,
        menu_items.name,
        menu_items.id,
        menu_items.price
      LIMIT 4;
    `;
    const userId = parseInt(req.body.userId);
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
