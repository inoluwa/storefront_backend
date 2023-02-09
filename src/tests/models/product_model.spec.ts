import { Product } from "../../interfaces/product.interface";
import { ProductStore } from "../../models/products";


const store = new ProductStore()


describe('Product Model', () => {
    let product:Product;
    let productId:number;
    const product_name ="Rechargeable lamp"
    
beforeAll(async () => {
            product = await store.createProduct({
                "product_name":product_name,
                "price":40,
                "category":"Home appliances",
            })
            productId = product.id as number
        })

        it('should create a product', async () => {
          const  product = await store.createProduct({
                "product_name":"Electric Fan",
                "price":15,
                "category":"Home appliances"
            }) 
            expect(product.id).toBeGreaterThan(0)
         
        })

        it('should get all products', async() => {
            const allProducts = await store.getAllProducts()
            expect(allProducts.length).toBeGreaterThan(0)
        })

        it('should get five products', async() => {
            const allProducts = await store.getProductTopFive()
            expect(allProducts.length).toBeGreaterThan(0)
        })

        it('should get product by id', async() =>{
            const prodId=productId.toString()
            const getProduct = await store.getProductById(prodId);
            expect(getProduct.product_name).toEqual(product_name)
        })
        // it('should get current user order', async() => {
        //    const orderCurrentUser = await orderStore.currentUserOrder(userId)
        //    expect(orderCurrentUser.user_id).toEqual(userId)
        // })

        // it('should return all orders', async() => {p
        //     const allOrders = await orderStore.getAllOrders()
        //     expect(allOrders.length).toBeGreaterThan(0)
        // })
    })
