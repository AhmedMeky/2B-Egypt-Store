export interface CartItem {
  productId: string;
  productName: string;
  productNamear: string;
  quantity: number;
  price: number;
  discount: number; 
  totalPrice: number; 
  image:String;
  // images: { imageUrl: string }[];
  stock:number;
}