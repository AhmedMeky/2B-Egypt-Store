import { Injectable } from '@angular/core';
import { CartItem } from '../Models/CartItem';
import { IProduct } from '../../../models/IProduct';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: CartItem[] = [];
  private cartCounter: number = 0; 
  private cartminus : number =0;
  constructor() {
    const savedCart = localStorage.getItem('cart');
    this.cart = savedCart ? JSON.parse(savedCart) : [];
  }

  addToCart(item: CartItem) {
    console.log(item)
    const existingItem = this.cart.find(i => i.productId === item.productId);
    if (existingItem) {
      existingItem.totalPrice = existingItem.quantity * existingItem.price;
    } else {
      this.cart.push(item);
      this.addToCartCounter();
    }
    
    this.saveCart();
  }

  removeFromCart(productId: string) {
    this.cart = this.cart.filter(item => item.productId !== productId);
    this.saveCart();
  }
  
  updateQuantity(productId: string, quantity: number) {
    const item = this.cart.find(i => i.productId === productId);
    if (item) {
      item.quantity = quantity;
      item.totalPrice = item.price * quantity;
      this.saveCart();
    }
  }

  getCartItems(): CartItem[] {
    return this.cart;
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  clearCart() {
    this.cart = [];
    localStorage.removeItem('cart');
  }
  addToCartCounter() {
   
      this.cartCounter++;
    
  }
  minusCartCounter() {
    this.cartCounter--;
  }
  getCounter(): number {
    return this.cart.length;
  }
  minCounter(): number {
    return this.cartminus;
  }
}
