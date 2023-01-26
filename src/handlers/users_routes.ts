import express, {Request, Response}from 'express'
import { Users, UserStore } from '../models/users'
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv'
import verifyAuthToken from '../middleware/authRouteGuard';


dotenv.config() 
const store = new UserStore()

const index = async(_req:Request, res:Response ) => {
    const users = await store.index()
    res.json(users)
}


const show = async(req:Request, res:Response) => {
    const user = await store.show(req.params.id)
    res.json(user)
}



const create = async(req:Request, res:Response) => {
     try {
        const user:Users = {
            id:req.body.id,
            username:req.body.username,
            firstName:req.body.firstname,
            lastName:req.body.lastname,
            password:req.body.password
        }

       const newUser = await store.create(user)
       res.status(201).json(newUser);
     }catch(err) {
        res.status(400)
        res.json(err)
     }
}
const login = async(req:Request, res:Response) => {
    try {
       
      const username =req.body.username;
      const password =req.body.password;
      const newUser = await store.signIn(username, password);
      const SECRET_KEY: Secret =process.env.SECRET_KEY as string ;
if(newUser){ 
   const token = jwt.sign({ _id: newUser.id?.toString(), name: newUser.firstName }, SECRET_KEY); 
  return res.status(201).json( {  token: token });

}else{
    return res.status(401).json({msg:'Invalid username or password'});
}
      
    }catch(err) {
       res.status(400)
       res.json(err)
    }
}
const userRoutes = (app: express.Application) => {
    app.get('/users',verifyAuthToken, index)
    app.get('/user/:id', verifyAuthToken, show)
    app.post('/user',verifyAuthToken, create)
    app.post('/user', login )
  }
  
  export default userRoutes
