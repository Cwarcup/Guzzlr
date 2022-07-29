-- Drop and recreate order_items table (Example)

DROP TABLE IF EXISTS order_items CASCADE;
CREATE TABLE order_items (
  order_id INTEGER REFERENCES orders(id) NOT NULL,
  menu_item INTEGER REFERENCES menu_items(id) NOT NULL
);
