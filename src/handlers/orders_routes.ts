import express, {Request, Response}from 'express'
import { Order } from '../interfaces/order.interface'
import verifyAuthToken from '../middleware/authRouteGuard'
import { OrderStore} from '../models/orders'


const store = new OrderStore()

const allOrders = async(_req:Request, res:Response ) => {
    const orders = await store.getAllOrders()
    res.status(200).json(orders);
}


const getCurrentuserOrder = async(req:Request, res:Response) => {
    const userId= Number(req.params.id);
    const orderByUser = await store.currentUserOrder(userId)
    res.status(200).json(orderByUser);
}


const create = async(req:Request, res:Response) => {
     try {
        const orders:Order = {
            user_id: req.body.user_id,
            status_of_order: req.body.status_of_order
        }
       const newOrders = await store.create(orders)
       res.status(201).json(newOrders)
     }catch(err) {
        res.status(400)
        res.json(err)
     }
}

const orderRoutes = (app: express.Application) => {
    app.get('/orders', verifyAuthToken, allOrders)
    app.get('/current-user/:id', verifyAuthToken, getCurrentuserOrder)
    app.post('/create-order', verifyAuthToken, create)
  }
  
  export default orderRoutes