const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    const values = [req.body.ownerId.trim()];
    const queryText = `
        SELECT
          *
        FROM users
        WHERE users.id = $1;
        `;
    db.query(queryText, values)
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => {
        console.log('err:', err);
        res.json(err);
      });
  });
  return router;
};
