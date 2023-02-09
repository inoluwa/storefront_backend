import DB from '../database'
import { OrderProduct } from '../interfaces/order.interface'

export class OrderProductStore {
    async AllOrderProduct(): Promise<OrderProduct[]> {
        try{
            const conn = await DB.connect()
            const sql = 'SELECT * FROM order_product'
            const result = await conn.query(sql)

            conn.release()
            return result.rows   
        }catch(err) {
            throw new Error(`Cannot get orders. Error:${err}`)
        }
    }
    async AllOrderProductByOrderId(id: number): Promise<OrderProduct[]> {
        try{
            const conn = await DB.connect()
            const sql = 'SELECT * FROM order_product WHERE order_id= ($1)'
            const result = await conn.query(sql, [id])

            conn.release()
            return result.rows  
        }catch(err) {
            throw new Error(`Cannot get orders. Error:${err}`)
        }
    }

    async addProductToOrder(p: OrderProduct): Promise<OrderProduct> {
        try {
            const sql =
                'INSERT INTO order_product (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *'
            
            const connection = await DB.connect()

            const result = await connection.query(sql, [
                p.order_id,
                p.product_id,
                p.quantity,
            ])
            connection.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Product could not be added. Error: ${err}`)
        }
    }
}