import DB from '../database'
import { Product } from '../interfaces/product.interface'



export class ProductStore {
   async getAllProducts(): Promise<Product[]> {
        try{
            const conn = await DB.connect()
            const sql = 'SELECT * FROM products'
            const result = await conn.query(sql)

            conn.release()
            return result.rows   
        }catch(err) {
            throw new Error(`Cannot get products. Error:${err}`)
        }
    }

    async getProductById(id:string): Promise<Product[]> {
        try{
            const sql = `SELECT * FROM products WHERE id = ($1)`
            const conn = await DB.connect()
            const result = await conn.query(sql, [id])

            conn.release()
            return result.rows[0]
        }catch(err) {
            throw new Error(`Couldn't find a product ${id}. Error:${err}`)
        }
    }
    async getProductTopFive(): Promise<Product[]> {
        try{
            const sql = `SELECT * FROM products order by id asc
            limit 5`
            const conn = await DB.connect()
            const result = await conn.query(sql)

            conn.release()
            return result.rows
        }catch(err) {
            throw new Error(`Couldn't find a product . Error:${err}`)
        }
    }
    async createProduct(p: Product): Promise<Product> {
        try {
            const sql = `INSERT INTO products (product_name, price, category) VALUES ($1, $2, $3)`
            const conn = await DB.connect()
            
            const result = await conn.query(sql, [ p.product_name, p.price, p.category ])
         
           
            
            conn.release();
            //const product 
            return  result.rows[0];
            
        }catch(err) {
            throw new Error(`Couldn't add product. Error:${err}`)
        }
    }
}
 