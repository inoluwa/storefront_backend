CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id bigint REFERENCES products(id),
    user_id bigint REFERENCES users(id),
    status_of_order VARCHAR(15),
    quantity INTEGER

);