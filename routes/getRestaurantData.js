const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    db.query(
      `
      SELECT * from restaurants WHERE id = ${req.body.id};
      `
    )
      .then(data => {
        let restaurant = data.rows[0];
        res.json({ restaurant });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
