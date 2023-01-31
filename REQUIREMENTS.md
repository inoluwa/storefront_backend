# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index: `'products/' [GET]`
- Show: `'products/:id' [GET]`
- Create [token required]: `'product/' [POST]`
- [OPTIONAL] Top 5 most popular products: `'product/top' [GET]`
- [OPTIONAL] Products by category (args: product category): 

#### Users
- Index [token required]: `'users/' [GET]`
- Show [token required]: `'user/:id' [GET]`
- Create N[token required]: `'user/create [POST]`
- Login : `'user/login' [GET]`

#### Orders
- Current Order by user (args: user id)[token required]: `'current-user/:id' [GET] `
- Index: `'orders/' [GET]`
- Create: `'/create-orders' [POST]`
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

### Order-products
- Index: `'/order-products' [GET]`
- Add product to order: `'/add-product' [POST]`

## Data Shapes
#### Product Table
-  id  `SERIAL PRIMARY KEY`
- name `VARCHAR`
- price `INTEGER`
- [OPTIONAL] category `VARCHAR`

#### User
- id `SERIAL PRIMARY KEY`
- firstName `VARCHAR`
- lastName `VARCHAR`
- password `VARCHAR`

#### Orders
- id `SERIAL PRIMARY KEY`
- user_id `INTEGER` `REFERENCES users(id)`
- status_of_order (active or complete) `BOOLEAN`

#### *order_products*
- order_id `INTEGER` `REFERENCES orders(id)` 
- product_id `INTEGER` `REFERENCES products(id)`
- quantity `INTEGER`
