-- Drop and recreate menu_items table (Example)

DROP TABLE IF EXISTS menu_items CASCADE;
CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  menu_section VARCHAR(50),
  is_active BOOLEAN DEFAULT TRUE
);
