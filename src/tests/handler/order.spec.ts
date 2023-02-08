
import index from '../../index';
import supertest from 'supertest';
import { Order } from '../../interfaces/order.interface';
import { response } from 'express';
const request = supertest(index);

//Test for order
describe('Testing the   endpoint for order ', () => {
  let userId: number ;
  let token: string;
beforeAll(async () => {
  const user =  {
    username: "myheaher",
    password: '12345h6',
    firstName: 'kj',
    lastName: 'nm'
  }

const userInfo= await  request.post(`/user/create`).send(user);

userId = userInfo.body.id

const userLogin = {
  username:user.username,
  password:user.password
}
const responseUserLogin= await request.post(`/user/login`).send(userLogin);
 

token = responseUserLogin.body.token

})
  it('Testing Create API ',   async () => {
      const order:Order=  { 
           user_id:userId,
           status_of_order:true
        }
        
  const response= await request.post(`/create-order`).set("Authorization", "bearer " + token).send(order);
expect(response.statusCode).toEqual(201);     
  })
  it('Testing  GET all orders API ',   async () => {
    const response= await request.get(`/orders`).set('Authorization', 'bearer ' + token);
  expect(response.statusCode).toEqual(200);     
    })
    it('Testing  GET all orders ById ',   async () => {
      const response= await request.get(`/current-user/${1}`).set('Authorization', 'bearer ' + token);
    expect(response.statusCode).toEqual(200);     
      });

});



