import express, {Request, Response}from 'express'
import { Users, UserStore } from '../models/users'


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

const userRoutes = (app: express.Application) => {
    app.get('/users', index)
    app.get('/user/:id', show)
    app.post('/user', create)
  }
  
  export default userRoutes
