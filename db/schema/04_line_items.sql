DROP TABLE IF EXISTS line_items CASCADE;
CREATE TABLE line_items (
  id SERIAL PRIMARY KEY NOT NULL,
  food_item_id INTEGER REFERENCES food_items(id)
  user_order_id INTEGER REFERENCES user_orders(id)
);
