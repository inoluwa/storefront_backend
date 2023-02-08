import { UserStore } from "../../models/users";
import { Users } from "../../interfaces/user.interface";

const store = new UserStore()

describe('Testing User Model', () => {
    let userId: number;
    let userTop:Users;
    beforeAll(async () => {
       
      
         userTop = await store.create({
            username: 'Tester',
            password: 'Pass233$',
            firstName: 'James ',
            lastName: 'Nelson'
        })
        userId=Number(userTop.id);
      
      })

    it('should create user', async() => {
    const user:Users = await store.create({
        username: 'myheader',
        password: '123456',
        firstName: 'kj',
        lastName: 'nm'
    })
     expect(user.username).toEqual('myheader')
    })

    it('should show list of users', async() =>{
        const users = await store.getAllUsers()
        expect(users.length).toBeGreaterThan(0)
    })

    it('should show specific user', async() => {
        const user = await store.show(userId) 
        expect(user.username).toEqual(userTop.username)
    })
})

