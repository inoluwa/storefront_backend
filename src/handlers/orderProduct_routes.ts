import express, {Request, Response} from 'express'
import verifyAuthToken from '../middleware/authRouteGuard'
import { OrderProductStore } from '../models/order_product'

const store = new OrderProductStore()

const getAllOrderProduct = async(_req:Request, res:Response) => {
    const orderProducts = await store.AllOrderProduct()
    res.status(200).json(orderProducts);
}

const getAllProductsUnderOrderId = async(req:Request, res:Response) => {
    const orderId =Number(req.params.orderid);
    const orderProducts = await store.AllOrderProductByOrderId(orderId);
    res.status(200).json(orderProducts);
}



const addProductToOrder = async(req: express.Request, res: express.Response) => {
    try {
        const order_id = Number(req.body.order_id)
        const product_id = Number(req.body.product_id as string)
        const quantity = Number(req.body.quantity as string)

        if (!order_id || !product_id || !quantity) {
            return res.status(400).json({
                error: 'One or more required parameters missing',
            })
        }

        const product = await store.addProductToOrder({
            order_id,
            product_id,
            quantity,
        })

        res.status(201).json(product)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const orderProductRoutes = (app: express.Application) => {
    app.get('/order-products', getAllOrderProduct)
    app.get('/order-products/:orderid', getAllProductsUnderOrderId)
    app.post('/add-orderproduct',verifyAuthToken, addProductToOrder)
  }
  export default orderProductRoutes