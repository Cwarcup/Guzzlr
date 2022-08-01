const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post('/', (req, res) => {
    console.log('DATA FROM FORM = req.body:', req.body);

    const queryText = `
        SELECT
          *
        FROM users
        WHERE email = $1 AND password_REPLACE_ME = $2;
        `;
    db.query(queryText, [req.body.email, req.body.password])
      .then(result => {
        console.log('✅ result from query:', result);
        res.json(result.rows);
      })
      .catch(err => {
        console.log('err:', err);
        res.json(err);
      });
  });
  return router;
};
