
import index from '../../index';
import supertest from 'supertest';
import { UserStore } from '../../models/users';


const request = supertest(index);

//Test for user
describe('Testing the  endpoint for User Signin ',() => {
  const username = "myheader";
  const password= '123456';
  beforeAll(async () => {
  const user =  {
    username,
    password,
    firstName: 'kj',
    lastName: 'nm'
  }

 await  request.post(`/user/create`).send(user);


})
 
    
  it('Testing Create API ',   async () => {

    const user=  {
      username,
      password, 
      }
  const response= await request.post(`/user/login`).send(user);
expect(response.statusCode).toEqual(201);     
  });


});

// describe('Testing the  endpoint for Middleware Guard ',() => {
// it("should require authorization on every endpoint", (done) => {
//   request
//   .get("/users")
//   .then((res) => {
//     expect(res.status).toBe(401)
//     done()
//   }) 
// });

// });

