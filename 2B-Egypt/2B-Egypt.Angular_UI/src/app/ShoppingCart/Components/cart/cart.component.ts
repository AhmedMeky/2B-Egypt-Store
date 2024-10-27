import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/CartService';
import { CartItem } from '../../Models/CartItem';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  standalone:true,
  imports: [FormsModule,CommonModule,JsonPipe]

})
export class CartComponent implements OnInit{
  cartItems: CartItem[] =[];
  imgmvcurl = 'http://localhost:5269/img/';
  constructor(private cartService: CartService,private route:ActivatedRoute) {
  }
  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
    this.cartItems = this.cartService.getCartItems();
  }

  updateQuantity(productId: number, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
    this.cartItems = this.cartService.getCartItems();
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
  }
}