import { UserStore } from "../../models/users";
import { Users } from "../../interfaces/user.interface";
import verifyAuthToken from "../../middleware/authRouteGuard";

const store = new UserStore()

describe('Testing User Model', () => {
    let userId: number;
    let userTop:Users | null;
    const userInfo: Users= {
      
        username: 'James'+Date.now(),
        password: 'Pass233$',
        firstName: 'James ',
        lastName: 'Nelson'
    }
    beforeAll(async () => {
    
      
         userTop = await store.create(userInfo)
        userId=userTop?.id as number;
      
      })

    it('should create user', async() => {
        const userModel:Users= {
            username: 'myheader'+Date.now(),
            password: '123456',
            firstName: 'kj',
            lastName: 'nm'
        }
    const user= await store.create(userModel)
     expect(userModel?.username).toEqual(userModel.username)
    })

    it('should show list of users', async() =>{
        const users = await store.getAllUsers()
        expect(users.length).toBeGreaterThan(0)
    })

    it('should show specific user', async() => {
        const user = await store.show(userId) 
        expect(user.username).toEqual(userInfo.username)
    })

    it('should sign-in a user', async() => {
        const userSignIn =await store.signIn(userInfo.username, userInfo.password);
        expect(userInfo.username).toEqual(userSignIn?.username as string)
    })
})

