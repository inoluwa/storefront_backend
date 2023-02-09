import { Product } from "../../interfaces/product.interface";
import { ProductStore } from "../../models/products";
import { OrderStore } from "../../models/orders";
import { UserStore } from "../../models/users";
import { Users } from "../../interfaces/user.interface";
import { Order } from "../../interfaces/order.interface";


const store = new ProductStore()
const orderStore = new OrderStore()
const userStore = new UserStore()


describe('Order Model', () => {
    let product:Product;
    let productId:number;
    let user:Users | null;

    let userId:number;
    let order: Order | null;
    let orderId:number;

        beforeAll(async () => {
            product = await store.createProduct({
                "product_name":"Electric Fan",
                "price":15,
                "category":"Home appliances",
            })

            productId = product.id as number

        user = await userStore.create({
            username: 'myheader',
            password: '123456',
            firstName: 'kj',
            lastName: 'nm'
        })
        userId = user?.id as number

        })

        it('should create an order', async () => {
            order = await orderStore.create({
                   user_id:userId,
                   status_of_order:true
            })
            orderId =order?.id as number;
            expect(orderId).toBeGreaterThan(0)
         
        })

        it('should get current user order', async() => {
           const orderCurrentUser = await orderStore.currentUserOrder(userId)
           expect(orderCurrentUser.user_id).toEqual(userId)
        })

        it('should return all orders', async() => {
            const allOrders = await orderStore.getAllOrders()
            expect(allOrders.length).toBeGreaterThan(0)
        })
    })
