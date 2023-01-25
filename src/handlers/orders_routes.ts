import express, {Request, Response}from 'express'
import { Orders, OrderStore} from '../models/orders'


const store = new OrderStore()

const index = async(_req:Request, res:Response ) => {
    const orders = await store.index()
    res.json(orders)
}


const userOrder = async(req:Request, res:Response) => {
    const product = await store.userOrder(req.body.user_id)
    res.json(product)
}


const create = async(req:Request, res:Response) => {
     try {
        const orders:Orders = {
            id:req.body.id,
            product_id:req.body.product_id,
            user_id:req.body.user_id,
            status_of_order:req.body.status_of_order,
            quantity:req.body.quantity
        }

       const newOrders = await store.create(orders)
       res.json(newOrders)
     }catch(err) {
        res.status(400)
        res.json(err)
     }
}

const orderRoutes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/order/:id', userOrder)
    app.post('/orders', create)
  }
  
  export default orderRoutes