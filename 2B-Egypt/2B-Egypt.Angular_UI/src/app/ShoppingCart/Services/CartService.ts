import { Injectable } from '@angular/core';
import { CartItem } from '../Models/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: CartItem[] = [];

  constructor() {
    const savedCart = localStorage.getItem('cart');
    this.cart = savedCart ? JSON.parse(savedCart) : [];
  }

  addToCart(item: CartItem) {
    const existingItem = this.cart.find(i => i.productId === item.productId);
    if (existingItem) {
      existingItem.quantity += item.quantity;
      existingItem.totalPrice = existingItem.quantity * existingItem.price;
    } else {
      this.cart.push(item);
    }
    this.saveCart();
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter(item => item.productId !== productId);
    this.saveCart();
  }

  updateQuantity(productId: number, quantity: number) {
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
}
