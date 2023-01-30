import express from "express";
import orderRoutes from "./handlers/orders_routes";
import productRoutes from "./handlers/products_routes"
import userRoutes from "./handlers/users_routes"
import orderProductRoutes from "./handlers/orderProduct_routes"
import bodyParser from 'body-parser'

const app = express();
const port= 3000;

app.use(bodyParser.json())


//call the functions
orderRoutes(app)
productRoutes(app)
userRoutes(app)
orderProductRoutes(app)



app.listen(port,()=>{
    console.log(`Server running at ${port}`);
} )


export default app;