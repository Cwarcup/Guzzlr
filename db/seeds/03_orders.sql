-- Orders table seeds here (Example)
-- two pending orders
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
    '2022-08-05 17:02:00',
    'Please make sure to bring a large plate for the entree.',
    45000
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
    20,
    1,
    '2022-08-05 17:10:00',
    'Extra napkins please.',
    1875
  );

-- -- current order
-- -- order_started is NOT null
INSERT INTO
  orders (
    user_id,
    restaurant_id,
    order_placed,
    order_started,
    price,
    pickup_time
  )
VALUES
  (
    2,
    1,
    '2022-08-05 16:52',
    '2022-08-05 16:53',
    7250,
    '10:15 AM'
  );

-- -- completed order
-- -- should not show up on admin
INSERT INTO
  orders (
    user_id,
    restaurant_id,
    order_placed,
    order_started,
    order_completed,
    notes,
    price,
    pickup_time
  )
VALUES
  (
    5,
    1,
    '2015-03-08 02:00:00',
    '2015-03-08 02:11:00',
    '2015-03-08 02:30:00',
    'Should not show up on admin',
    8000,
    '6:00 PM'
  );