import index from '../../index';
import supertest from 'supertest';
import { Order } from '../../interfaces/order.interface';
import { Product } from '../../interfaces/product.interface';

const request = supertest(index);

describe('Testing the endpoint for order-products',  ()=>{
    let userId: number;
    let orderId: number;
    let productId: number;
    let token: string;
beforeAll(async()=>{
     const user = {
        username: "myheader",
        password: '123456',
        firstName: 'kj',
        lastName: 'nm'
     }

const userInfo= await  request.post(`/user/create`).send(user);
     userId = userInfo.body.id


     const userLogin=  {
        username:user.username,
        password:user.password,
        }
    const responseUserLogin= await request.post(`/user/login`).send(userLogin);
    token= responseUserLogin.body.token


     const order:Order =  { 
        user_id:userId,
        status_of_order:true
     }
const orderInfo= await request.post(`/create-order`).set("Authorization", "bearer " + token).send(order);
    orderId = orderInfo.body.id;


    const product:Product =  { 
        product_name:"Electric Fan",
        price:15,
        category:"Home appliances"
    }
     
const productInfo= await request.post(`/product`).set("Authorization", "bearer " + token).send(product);

    productId = productInfo.body.id;
    
   
})
it('Testing  GET product under order API', async()=>{
    const addProductToOrder = {
       order_id:orderId,
       product_id:productId,
       quantity: 1
    }
    const response= await request.post(`/add-orderproduct`).set("Authorization", "bearer " + token).send(addProductToOrder);
    expect(response.statusCode).toEqual(201);
})


}
)