DROP TABLE IF EXISTS user_orders CASCADE;
CREATE TABLE user_orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id)
  prep_time VARCHAR(255),
  date TIMESTAMP,
);
