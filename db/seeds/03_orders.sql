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
    order_started,
    notes,
    price,
    pickup_time
  )
VALUES
  (
    2,
    1,
    '2015-03-08 04:00:00',
    '2015-03-08 04:01:00',
    'Make sure to bring a fork',
    5000,
    '6:00 PM'
  );

-- completed order
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
    'I like lots of mayo',
    8000,
    '6:00 PM'
  );