
import index from '../index';
import supertest from 'supertest';


const request = supertest(index);

//Test for product
describe('Testing the   endpoint ',async() => {
  const product=  {
        "product_name":"Electric Fan",
        "price":15,
        "category":"Home appliances"
    }
  it('Testing  Product API ',   async () => {
  const response= await request.post(`/product`).send(product);
expect(response.statusCode).toEqual(201);     
  });
  

});
// describe(' Test for missing image', async() => {
//   it('Checking for the already existing image', async () => {
//     //await expectAsync(newResizeImage('fjord', 400, 400)).toBeResolved();
//   });
// });


