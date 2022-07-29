-- Drop and recreate menus table (Example)

DROP TABLE IF EXISTS menus CASCADE;
CREATE TABLE menus (
  restaurant_id INTEGER REFERENCES restaurants(id) NOT NULL,
  menu_item INTEGER REFERENCES menu_items(id) NOT NULL
);
