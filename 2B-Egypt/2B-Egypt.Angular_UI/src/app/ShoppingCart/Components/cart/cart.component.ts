import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CartService } from '../../Services/CartService';
import { CartItem } from '../../Models/CartItem';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, JsonPipe } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IProduct } from '../../../../models/IProduct';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  standalone:true,
  imports: [FormsModule,CommonModule,JsonPipe,RouterModule,TranslateModule]


})
export class CartComponent implements OnInit {
  cartItems: CartItem[] =[];
  showStockError: boolean = false;
  subTotal:number=0;
  public translate: TranslateService;
  imgmvcurl = 'http://localhost:5269/img/';
  product: IProduct = {} as IProduct;
  cart: CartItem = {} as CartItem;

  constructor(private cartService: CartService,private route:ActivatedRoute, public translateService: TranslateService,) {
    this.translate = translateService;

  }
 
  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    console.log(this.cartItems)
    this.subTotal = 0
    this.cartItems.forEach(item=>{
 
      this.subTotal+= item.price*item.quantity
    })
    
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
    const productInCart = this.cartItems.find(item => item.productId === productId);
    
    if (productInCart) {
        if (quantity > productInCart.stock) {
            this.showStockError = true; 
        } else {
            this.showStockError = false; 
            productInCart.quantity = quantity; 
            this.cartService.updateQuantity(productId, quantity);
        }
    }
}

increaseQuantity(item: CartItem) {
  const newQuantity = item.quantity + 1; 
  this.updateQuantity(item.productId, newQuantity); 
  item.quantity = newQuantity; 
  this.subTotal = 0
  this.cartItems.forEach(item=>{

    this.subTotal+= item.price*item.quantity
  })
}

decreaseQuantity(item: CartItem) {
  if (item.quantity > 1) {
      const newQuantity = item.quantity - 1; 
      this.updateQuantity(item.productId, newQuantity); 
      item.quantity = newQuantity; 
  }
  this.subTotal = 0
  this.cartItems.forEach(item=>{

    this.subTotal+= item.price*item.quantity
  })
}




  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
  }
 
  








}