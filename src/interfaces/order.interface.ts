export interface Order {
    status_of_order: boolean,
    id?: number
    user_id: number
    
}

export interface OrderProduct {
    id?: number
    order_id: number
    product_id: number
    quantity: number
}
