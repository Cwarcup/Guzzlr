-- Orders table seeds here (Example)
INSERT INTO
  orders (
    user_id,
    restaurant_id,
    order_placed,
    order_completed,
    notes,
    price
  )
VALUES
  (
    1,
    1,
    '2015-03-08 02:00:00',
    '2015-03-08 02:30:00',
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
    '2015-03-08 04:00:00',
    '',
    2000
  );

-- current order
INSERT INTO
  orders (
    user_id,
    restaurant_id,
    order_placed,
    notes,
    price,
    order_started
  )
VALUES
  (
    1,
    1,
    '2015-03-08 04:00:00',
    'Make sure to bring a fork',
    2000,
    '6:00 PM'
  );