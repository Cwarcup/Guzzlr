const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post('/', (req, res) => {
    const queryText = `
        SELECT
          *
        FROM users
        WHERE email = $1 AND password_REPLACE_ME = $2;
        `;
    db.query(queryText, [req.body.email, req.body.password], (error, result) => {
      if (error) {
        console.log("error at POST lookupAllLogins: ", error);
        res.status(500).json({ error: error.message });
      } else {
        // console.log("result: ", result);
        res.json(result.rows);
      }
    }
    );
  });
  return router;
};
