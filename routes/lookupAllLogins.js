const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    db.query(
      `
      SELECT
        *
      FROM users;
      `
    )
      .then(data => {
        console.log(data);
        const lookupAllLogins = data.rows;
        res.json({ lookupAllLogins });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
