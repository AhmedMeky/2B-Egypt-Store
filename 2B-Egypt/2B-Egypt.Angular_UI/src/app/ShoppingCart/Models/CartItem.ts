export interface CartItem {
  productId: string;
  productName: string;
  productNamear: string;
  quantity: number;
  price: number;
  discount: number; // إضافة الخصم
  totalPrice: number; // price * quantity
  image:String;
  stock:number;
}