import DB from '../database'

export type Orders = {
    id:number;
    product_id:number;
    user_id:number;
    status_of_order:string;
    quantity:number;
}

export class OrderStore {
    async index(): Promise<Orders[]> {
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


        async userOrder(user_id:number): Promise<Orders> {
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

    async create(o:Orders): Promise<Orders> {
        try {
            const sql = `INSERT INTO orders (product_id, user_id, status_of_order, quantity) VALUES ($1, $2, $3, $4)`
            const conn = await DB.connect()
            const result = await conn.query(sql, [ o.product_id, o.user_id, o.status_of_order, o.quantity ])
            const order = result.rows[0]

            conn.release()
            return order
            
        }catch(err) {
            throw new Error(`Could not add  order. Error:${err}`)
        }
    }
}

 