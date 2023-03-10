import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'


dotenv.config() 

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const authorizationHeader = req.headers.authorization as string
        console.log("Token", authorizationHeader)
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.SECRET_KEY as string)

        next()
    } catch (error) {
        res.status(401)
    }
}
export default verifyAuthToken
