import DB from '../database'
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv'
import { Users } from '../interfaces/user.interface';



dotenv.config() 


export class UserStore {
   async getAllUsers(): Promise<Users[]> {
        try{
            const conn = await DB.connect()
            const sql = 'SELECT id, username, lastname, firstname FROM users'
            const result = await conn.query(sql)

            conn.release()
            return result.rows   
        }catch(err) {
            throw new Error(`Cannot get users. Error:${err}`)
        }
    }
   async signIn(username: string,  password: string): Promise<Users | null> {
        try{
            const conn = await DB.connect()
            const sql = `SELECT * FROM users where username= ($1) `
          
            const result = await conn.query(sql, [username  ] )
            if(result.rows.length){
                const user = result.rows[0];
                const  pepper=process.env.pepper
            if(bcrypt.compareSync(password+pepper, user.password)){
                return user
            }
            }
          
            return null;   
        }catch(err) {
            throw new Error(`Cannot get users. Error:${err}`)
        }
    }

    async show(id:string): Promise<Users[]> {
        try{
            const sql = `SELECT id, username, lastname, firstname FROM users WHERE id = ($1)`
            const conn = await DB.connect()
            const result = await conn.query(sql, [id])

            conn.release()
            return result.rows
        }catch(err) {
            throw new Error(`Couldn't find user with ${id}. Error:${err}`)
        }
    }

    async create(u:Users): Promise<Users> {
        try {
            const sql = `INSERT INTO users (username, lastname, firstname, password) VALUES ($1, $2, $3, $4) RETURNING  *`
            const  pepper=process.env.pepper
            const  saltRounds=process.env.saltRounds as string
            const conn = await DB.connect()
            const hash = bcrypt.hashSync(
                u.password + pepper, 
                parseInt(saltRounds)
             );
            const result = await conn.query(sql, [u.username, u.firstName, u.lastName, hash ])
           
//console.log(user)
            conn.release()
            const user = result.rows[0]
           
            return user
            
        }catch(err) {
            console.log(err)
            throw new Error(`Couldn't create user. Error:${err}`)
        }
    }
    
}

