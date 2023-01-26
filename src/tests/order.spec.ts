
import index from '../index';
import supertest from 'supertest';


const request = supertest(index);

//Test for order
describe('Testing the   endpoint for order ',async() => {
  const order=  {
        "order_name":"Electric Fan",
        "price":15,
        "category":"Home appliances"
    }
  it('Testing Create API ',   async () => {
  const response= await request.post(`/orders`).send(order);
expect(response.statusCode).toEqual(201);     
  });
  it('Testing  GET all orders API ',   async () => {
    const response= await request.get(`/orders`);
  expect(response.statusCode).toEqual(200);     
    });
    it('Testing  GET all orders ById ',   async () => {
      const response= await request.get(`/order/${1}`);
    expect(response.statusCode).toEqual(200);     
      });

});



