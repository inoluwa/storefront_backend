
import index from '../../index';
import supertest from 'supertest';


const request = supertest(index);

//Test for product 
describe('Testing the   endpoint for Product ',() => {
  let productId: number;
  let token: string;
beforeAll(async () => {
  const user =  {
    username: "myheader",
    password: '123456',
    firstName: 'kj',
    lastName: 'nm'
  }
const userLogin = {
  username:user.username,
  password:user.password
}

const responseUserLogin = await request.post(`/user/login`).send(userLogin);
token = responseUserLogin.body.token

const product=  {
  "product_name":"Kettle",
  "price":15,
  "category":"Home appliances"
}
const response= await request.post(`/product`).set('Authorization', 'bearer ' + token).send(product);
productId =response.body.id
})

  it('Testing Create API ',   async () => {
    const product=  {
      "product_name":"Electric Fan",
      "price":15,
      "category":"Home appliances"
  }
  const response= await request.post(`/product`).set('Authorization', 'bearer ' + token).send(product);
  expect(response.statusCode).toEqual(201);     
  })
  it('Testing  GET all Products API ',   async () => {
    const response= await request.get(`/products`).set('Authorization', 'bearer ' + token);
  expect(response.statusCode).toEqual(200);     
    })
    it('Testing  GET all Products ById ',   async () => {
      const response= await request.get(`/product/${productId}`).set('Authorization', 'bearer ' + token);
    expect(response.statusCode).toEqual(200);     
      })

});


