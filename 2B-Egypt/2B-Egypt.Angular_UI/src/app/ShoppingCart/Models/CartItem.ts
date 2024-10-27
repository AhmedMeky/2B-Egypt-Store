export interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  totalPrice: number; // price * quantity
  image:String;
}