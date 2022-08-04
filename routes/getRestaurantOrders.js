const express = require('express');
const router  = express.Router();

// returns all roder for restaurant with id of 1

module.exports = (db) => {
  router.get('/', (req, res) => {
    db.query(
      `
      SELECT
      restaurants.name as restaurant_name,
      orders.id as order_id,
      orders.order_placed as time_order_created,
      orders.order_completed as time_order_completed,
      orders.notes as order_notes,
      orders.price as total_order_price,
      orders.order_started as time_order_started,
      orders.pickup_time as pickup_time
    FROM
      restaurants
      JOIN orders ON orders.restaurant_id = restaurants.id
    WHERE
      restaurants.id = 1 
      AND orders.order_placed IS NOT NULL 
      AND orders.order_completed IS NULL;
      `
    )
      .then(data => {
        const orders = data.rows;
        res.json(orders);
      });
  });
  return router;
};
