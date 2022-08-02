const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    db.query(
      `
      SELECT
        *
      FROM
        menu_items
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
