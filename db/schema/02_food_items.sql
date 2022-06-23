DROP TABLE IF EXISTS food_items CASCADE;
CREATE TABLE food_items (
  id SERIAL PRIMARY KEY NOT NULL,
  name TEXT,
  image_url VARCHAR(255),
  price INTEGER
);
