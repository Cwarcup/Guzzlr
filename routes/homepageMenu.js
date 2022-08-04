const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    console.log('req ansdjgkf', req.query);
    db.query(
      `
      SELECT
        restaurant_id as restaurant_id,
        restaurants.name as rest_name,
        restaurants.*,
        menu_items.name,
        menu_items.price,
        menu_items.description,
        menu_items.id
      FROM
        restaurants
        JOIN menus ON restaurants.id = menus.restaurant_id
        JOIN menu_items ON menus.menu_item = menu_items.id
      WHERE
        restaurants.id = ${req.query.data}
      ;
      `
    )
      .then(data => {
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
