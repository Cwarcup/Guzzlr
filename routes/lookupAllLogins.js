const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post('/', (req, res) => {
    db.query(
      `
      SELECT
        *
      FROM users
      WHERE email = $1 AND password = $2;
      `, [req.body.email, req.body.password], (error, result) => {
        if (error) {
          console.log("error: ", error);
          res.status(500).json({ error: error.message });
        } else {
          console.log("result: ", result);
          res.json(result.rows);
        }
      }
    );
  });
  return router;
};
