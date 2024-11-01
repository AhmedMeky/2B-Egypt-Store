import { CartItem } from "../app/ShoppingCart/Models/CartItem";

export interface IOrder {
    userId:string,
    totalAmount:number,
    transactionId:string ,
    paymentType : string, 
    orderItems:any,
    StateEn:number,
    Statear:number
}
