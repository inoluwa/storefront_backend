import { OrderProductStore } from "../../models/order_product";
import { Product } from "../../interfaces/product.interface";
import { ProductStore } from "../../models/products";
import { OrderStore } from "../../models/orders";
import { UserStore } from "../../models/users";
import { Users } from "../../interfaces/user.interface";
import { Order, OrderProduct } from "../../interfaces/order.interface";

const productStore = new ProductStore()
const orderStore = new OrderStore()
const userStore = new UserStore()
const orderProductStore = new OrderProductStore()


describe('Order-product Model', () => {
    let product:Product;
    let productId:number;
    let userId:number;
    let orderId:number;

    beforeAll(async () => {
      const userTop = await userStore.create({
            username: 'Test',
            password: 'Pass275',
            firstName: 'Kunle ',
            lastName: 'Oyewusi'
        })
        userId=Number(userTop.id);


        const  product = await productStore.createProduct({
            "product_name":"Monitor",
            "price":90,
            "category":"Home appliances"
        })
         productId = product.id as number

         const order = await orderStore.create({
            user_id:userId,
            status_of_order:true
     })
     orderId = order?.id as number;
    })
    it('should add product to order', async()=>{
        const addProductToOrder :OrderProduct = {
            order_id:orderId,
            product_id:productId,
            quantity: 1
         }

         const productAddToOrder = await orderProductStore.addProductToOrder(addProductToOrder)
         expect(addProductToOrder.product_id).toEqual(productAddToOrder.product_id)

    })

    it('should get all order-products', async() => {
        const allOrderProduct = await orderProductStore.AllOrderProduct()
        expect(allOrderProduct.length).toBeGreaterThan(0)
    })


















})