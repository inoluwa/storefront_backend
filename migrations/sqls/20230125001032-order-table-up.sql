CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id bigint NOT NULL REFERENCES users(id),
    status_of_order BOOLEAN ,
    

);