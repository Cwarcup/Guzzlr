-- Drop and recreate Orders table (Example)
-- price is in CENTS (divide by 100 to get dollars)

DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  restaurant_id INTEGER REFERENCES restaurants(id) NOT NULL,
  order_placed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  order_completed TIMESTAMP DEFAULT NULL,
  notes TEXT,
  price INTEGER DEFAULT 0
);
