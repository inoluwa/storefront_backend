import express, {Request, Response}from 'express'
import { Product, ProductStore} from '../models/products'


const store = new ProductStore()

const getAllProducts = async(_req:Request, res:Response ) => {
    const products = await store.getAllProducts()
    res.status(200).json(products)
}


const getProductById = async(req:Request, res:Response) => {
    const product = await store.getProductById(req.params.id)
    res.status(200).json(product)
}


const create = async(req:Request, res:Response) => {
     try {
        const product:Product = {
            id:req.body.id,
            product_name:req.body.product_name,
            price:req.body.price,
            category:req.body.category
        }
        
       const newproduct = await store.createProduct(product)
       res.status(201).json(newproduct)
     }catch(err) {
        res.status(400)
        res.json(err)
     }
}

const productRoutes = (app: express.Application) => {
    app.get('/products', getAllProducts)
    app.get('/product/:id', getProductById)
    app.post('/product', create)
  }
  
  export default productRoutes
  
