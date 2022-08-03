const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post('/', (req, res) => {
    db.query(
      `
      INSERT INTO users (name, email, password_REPLACE_ME) VALUES ('${req.body.name}', '${req.body.email}', '${req.body.password}');
      `
    )
    .then(data => {
      res.status(200)
      res.json( { data });
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    })
  });
  return router;
};
