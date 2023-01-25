import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config() 

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_PORT
} = process.env

const db = new Pool({
    host:POSTGRES_HOST,
    database:POSTGRES_DB,
    user:POSTGRES_USER,
    password:POSTGRES_PASSWORD,
    port:Number(POSTGRES_PORT)
})

export default db