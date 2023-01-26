
import index from '../index';
import supertest from 'supertest';
import { Users, UserStore } from '../models/users';


const request = supertest(index);
const store = new UserStore()
//Test for user
describe('Testing the  endpoint for User Signin ',async() => {
  const user=  {
        "username":"myheader",
        "password":'123456', 
    }
    
  it('Testing Create API ',   async () => {
  const response= await request.post(`/login`).send(user);
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

