
import index from '../index';
import supertest from 'supertest';
import { Order } from '../interfaces/order.interface';
import { UserStore } from '../models/users';
import { Users } from '../interfaces/user.interface';

const store = new UserStore()
const request = supertest(index);

//Test for order
describe('Testing the   endpoint for order ', () => {
  let userId: number ;
beforeAll(async () => {
  const user =  {
    username: "myheader",
    password: '123456',
    firstName: 'kj',
    lastName: 'nm'
  }

const userInfo= await  request.post(`/user/create`).send(user);

userId = userInfo.body.id
})
  it('Testing Create API ',   async () => {
      const order:Order=  {
           user_id:userId,
           status_of_order:true
        }
  const response= await request.post(`/create-order`).send(order);
expect(response.statusCode).toEqual(201);     
  })
  it('Testing  GET all orders API ',   async () => {
    const response= await request.get(`/orders`);
  expect(response.statusCode).toEqual(200);     
    })
    it('Testing  GET all orders ById ',   async () => {
      const response= await request.get(`/current-user/${1}`);
    expect(response.statusCode).toEqual(200);     
      });

});



