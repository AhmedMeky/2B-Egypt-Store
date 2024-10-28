export interface CartItem {
  productId: string;
  productName: string;
  productNamear: string;
  quantity: number;
  price: number;
  totalPrice: number; // price * quantity
  image:String;
  stock:number;
}