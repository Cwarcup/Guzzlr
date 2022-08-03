const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post('/', (req, res) => {
    let restaurantID = 0;
    //console.log('RESPONSE!:', res);
    db.query(
      `
      SELECT restaurants.id
      FROM restaurants
      JOIN menus ON menus.restaurant_id = id
      WHERE menu_item = ${Number.parseInt(req.body.arr[0])};
      `
    )
      .then(data => {
        restaurantID = data.rows[0].id;
        db.query(
          `
          INSERT INTO
          orders (
            user_id,
            restaurant_id,
            price
          )
          VALUES
          (
          1,
          ${restaurantID},
          ${req.body.price * 100}
          );
          `
        )
          .then(data => {
            db.query(
              `
              SELECT id FROM orders
              WHERE user_id = 1 AND order_completed IS NULL
              ORDER BY order_placed DESC
              LIMIT 1;
              `
            )
              .then(data => {
                let orderID = data.rows[0].id;
                let queryStatement =
                `INSERT INTO
                order_items (order_id, menu_item)
                VALUES
                `
                for (const i of req.body.arr) {
                 queryStatement += `(${orderID}, ${i}),\n`
                }
                queryStatement = queryStatement.substring(0, queryStatement.length-2);
                queryStatement += `\n;`;
                db.query(queryStatement)
                  .then(data => {
                    res.status(201)
                    res.json( { data });
                  })
              })
              .catch(err => {
                res
                  .status(500)
                  .json({ error: err.message });
              })
          })
        })

  });
  return router;
};


// get restaurant id SELECT restaurants.id FROM restaurants JOIN menus ON menus.restaurant_id = id WHERE menu_item = arr[0];
  // insert orders (user_id, restaurant id)
  // get order id SELECT id FROM orders WHERE user_id = *user_id* AND order_completed IS NULL ORDER BY order_placed DESC LIMIT 1;
  // for cartArr, insert order_items(order_id, arr[1,2,3...])

/*
INSERT INTO
          orders (
          user_id,
          restaurant_id,
          notes,
          price
          )
          VALUES
          (
          1,
          1,
          '',
          2000
          );


INSERT INTO
  orders (
    user_id,
    restaurant_id,
    order_placed,
    notes,
    price
  )
VALUES
  (
    1,
    1,
    '2015-03-08 02:00:00',
    '',
    ${req.body.price * 100}
  );
  */
