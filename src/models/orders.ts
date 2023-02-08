import DB from '../database'
import { Order } from '../interfaces/order.interface'


export class OrderStore {
    
    async getAllOrders(): Promise<Order[]> {
        try{
            const conn = await DB.connect()
            const sql = 'SELECT * FROM orders'
            const result = await conn.query(sql)

            conn.release()
            return result.rows   
        }catch(err) {
            throw new Error(`Cannot get orders. Error:${err}`)
        }
    }


        async currentUserOrder(user_id:number): Promise<Order> {
            try{
                const conn = await DB.connect()
                const sql = 'SELECT * FROM orders WHERE user_id = ($1);'
                const result = await conn.query(sql, [user_id])
    
                conn.release()
                return result.rows[0]
            }catch(err) {
                throw new Error(`Cannot get orders. Error:${err}`)
            }
    } 

    async create(o:Order): Promise<Order | null> {
        try {
            const sql = `INSERT INTO orders ( user_id, status_of_order) VALUES ($1, $2) RETURNING *`
            const conn = await DB.connect()
            const result = await conn.query(sql, [  o.user_id, o.status_of_order  ])
            if(result.rows.length){
                const order = result.rows[0]
                return order
            }
         return null;
            
        }catch(err) {
            throw new Error(`Could not add  order. Error:${err}`)
        }
    }

}

 