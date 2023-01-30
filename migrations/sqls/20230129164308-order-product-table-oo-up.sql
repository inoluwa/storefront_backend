/* Replace with your SQL commands */
CREATE TABLE order_product (
  id SERIAL PRIMARY KEY,
  order_id bigint NOT NULL REFERENCES orders(id),
  product_id bigint NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL
)