import express, {Request, Response}from 'express'
import { Product, ProductStore} from '../models/products'


const store = new ProductStore()

const index = async(_req:Request, res:Response ) => {
    const products = await store.index()
    res.json(products)
}


const show = async(req:Request, res:Response) => {
    const product = await store.show(req.params.id)
    res.json(product)
}


const create = async(req:Request, res:Response) => {
     try {
        const product:Product = {
            id:req.body.id,
            product_name:req.body.product_name,
            price:req.body.price,
            category:req.body.category
        }
        
       const newproduct = await store.create(product)
       res.status(201).json(newproduct)
     }catch(err) {
        res.status(400)
        res.json(err)
     }
}

const productRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/product/:id', show)
    app.post('/product', create)
  }
  
  export default productRoutes
  
