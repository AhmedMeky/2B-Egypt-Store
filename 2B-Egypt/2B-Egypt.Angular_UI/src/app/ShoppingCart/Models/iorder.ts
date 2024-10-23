import { IOrderItems } from "./iorder-items";

export interface IOrder {
    orderNumber?:number;
    createdAt:string;
    status:string;
    totalAmount:number;
    orderItems:IOrderItems[];
}
