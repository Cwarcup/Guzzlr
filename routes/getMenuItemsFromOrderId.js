const express = require('express');
const router  = express.Router();

// query should:
// - accept an ID that belongs to an owner (have hard coded ID of 1)
// - return all orders that belong to that restaurant
// - return store name
// - return incomplete orders
// - return completed orders

module.exports = (db) => {
  router.get('/', (req, res) => {
    let orderId = req.query.orderId;
    const query = `
      SELECT
        menu_items.name as item_name,
        menu_items.price as item_price
      FROM
        order_items
        JOIN menu_items ON menu_items.id = order_items.menu_item
      WHERE
        order_items.order_id = ${orderId};
      `;
    db.query(query)
      .then(orderData => {
        const orderItems = orderData.rows;
        res.json(orderItems);
      });
  });
  return router;
};
