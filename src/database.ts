import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config() 

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_PORT,
    TEST_POSTGRES_DB,
    TEST_POSTGRES_USER,
    ENV_CHECKER
} = process.env
let db;
if(ENV_CHECKER==='dev'){
    db = new Pool({
        host:POSTGRES_HOST,
        database:POSTGRES_DB,
        user:POSTGRES_USER,
        password:POSTGRES_PASSWORD,
        port:Number(POSTGRES_PORT)
    })
}
else if(ENV_CHECKER==='test'){
    db = new Pool({
        host:POSTGRES_HOST,
        database:TEST_POSTGRES_DB,
        user:TEST_POSTGRES_USER,
        password:POSTGRES_PASSWORD,
        port:Number(POSTGRES_PORT)
    })
}

 
export default db