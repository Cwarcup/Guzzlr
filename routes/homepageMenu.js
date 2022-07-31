const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    db.query(
      `
      SELECT
        restaurant_id,
        menu_items.name,
        menu_items.price,
        menu_items.description
      FROM
        restaurants
        JOIN menus ON restaurants.id = menus.restaurant_id
        JOIN menu_items ON menus.menu_item = menu_items.id
      WHERE
        restaurants.id = 1
      LIMIT
        10;
      `
    )
      .then(data => {
        console.log(data);
        const menuItems = data.rows;
        res.json({ menuItems });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
