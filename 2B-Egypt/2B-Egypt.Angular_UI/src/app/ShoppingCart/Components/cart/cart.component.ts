import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/CartService';
import { CartItem } from '../../Models/CartItem';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, JsonPipe } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IProduct } from '../../../../models/IProduct';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  standalone:true,
  imports: [FormsModule,CommonModule,JsonPipe,TranslateModule]

})
export class CartComponent implements OnInit{
  cartItems: CartItem[] =[];
  public translate: TranslateService;
  imgmvcurl = 'http://localhost:5269/img/';
  product: IProduct = {} as IProduct;
  cart: CartItem = {} as CartItem;

  constructor(private cartService: CartService,private route:ActivatedRoute, public translateService: TranslateService,) {
    this.translate = translateService;

  }
  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    console.log("Current language:", this.translateService.currentLang);
  }
  getLocalizedProductName(item: CartItem): string {
    return this.translateService.currentLang === 'ar' ? item.productNamear : item.productName;
  }
  

  removeItem(productId: string) {
    console.log(productId)
    this.cartService.removeFromCart(productId);
    this.cartItems = this.cartService.getCartItems();
   this.cartService.minusCartCounter();
  }

  updateQuantity(productId: string, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
    this.cartItems = this.cartService.getCartItems();
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
  }
 
  







//   orderTotal = 0

// ngOnInit() {
//     // this.cartItems = this.cartService.getCartItems();
//     this.cartItems.forEach(item=>{
//       this.orderTotal+=item.price*item.quantity
//     })
//   }


// updateQuantity(productId: number, quantity: number) {
//     console.log('productId',productId)
//     console.log('quantity',quantity)
//     this.orderTotal=0
//     this.cartItems.forEach(item=>{
//       this.orderTotal+=item.price*item.quantity
//     })
//     // this.cartService.updateQuantity(productId, quantity);
//     // this.cartItems = this.cartService.getCartItems();
//   }
}