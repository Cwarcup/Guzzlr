const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post('/', (req, res) => {
    const queryText = `
        SELECT
          *
        FROM users
        WHERE email = $1;
        `;
    db.query(queryText, [req.body.email.trim()])
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
