
import index from '../index';
import supertest from 'supertest';


const request = supertest(index);

//Test for product
describe('Testing the   endpoint for Product ',async() => {
  const product=  {
        "product_name":"Electric Fan",
        "price":15,
        "category":"Home appliances"
    }
  it('Testing Create API ',   async () => {
  const response= await request.post(`/product`).send(product);
expect(response.statusCode).toEqual(201);     
  });
  it('Testing  GET all Products API ',   async () => {
    const response= await request.get(`/products`);
  expect(response.statusCode).toEqual(200);     
    });
    it('Testing  GET all Products ById ',   async () => {
      const response= await request.get(`/product/${1}`);
    expect(response.statusCode).toEqual(200);     
      });

});
// describe(' Test for missing image', async() => {
//   it('Checking for the already existing image', async () => {
//     //await expectAsync(newResizeImage('fjord', 400, 400)).toBeResolved();
//   });
// });


