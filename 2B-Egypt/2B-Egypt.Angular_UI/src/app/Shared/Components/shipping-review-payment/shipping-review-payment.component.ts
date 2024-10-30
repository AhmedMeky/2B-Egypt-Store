import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShippingService } from '../../../services/shipping.service';
import { IShippingData } from '../../../../models/ishipping-data';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { IOrder } from '../../../../models/iorder';
import { CartService } from '../../../ShoppingCart/Services/CartService';
import { CartItem } from '../../../ShoppingCart/Models/CartItem';

@Component({
  selector: 'app-shipping-review-payment',
  standalone: true,
  imports: [CommonModule, FormsModule , RouterModule],
  templateUrl: './shipping-review-payment.component.html',
  styleUrls: ['./shipping-review-payment.component.css'],
})
export class ShippingReviewPaymentComponent implements OnInit {
  IsShipping : boolean = true;
  order:IOrder = {} as IOrder
  email:string="";
  @ViewChild('shippingStep', { static: false }) shippingStep!: ElementRef;
  @ViewChild('paymentStep', { static: false }) paymentStep!: ElementRef;
  
  country = 'Egypt';
  cities = [
    'Mohandessin', 'Dokki', 'Agouza', 'Bulaq', 'Imbaba',
    'Pyramids', 'Giza', 'Ossim', 'Kerdasa', 'Faisal', 'El Haram',
    '6th of October', 'Al Ahram', 'Al Khatatba', 'Al Awqaf', 'Al Manial', 'Other'
  ];
  
  shippingData: IShippingData = {
    country: this.country,
    city: '',
    addressLine1: '',
    addressLine2: '',
    phoneNumber: ''
  };
  
  constructor(private _shippingService: ShippingService ,private _order:OrderService , private _cartService:CartService) {}
  ngOnInit() {
    this.IsShipping=true;
    this.order.transactionId = "1";
    this.order.paymentType = "cash";
    const userString = sessionStorage.getItem("user");
    let array  = this._cartService.getCartItems()
    this.order.totalAmount = array.reduce((sum, item) => sum + item.totalPrice, 0);
    
    let Items = array.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      itemTotalPrice: item.totalPrice
    }));
    
    console.log(Items)
    this.order.orderItems = Items
    let subTotal = 0
    for(let total of array)
      {
        subTotal+=total.totalPrice
      }
      console.log(subTotal)
      console.log(array)
      // this.order.orderItems  = array.map(({ productId, totalPrice , quantity }) => ({ productId, totalPrice , quantity }));
      var getToken =sessionStorage.getItem("token");
      if (getToken)
        {
    
    console.log(this.order.userId)
  }
  if (userString) {
    const user = JSON.parse(userString);
    this.email = user.email; 
    this.order.userId=user.id;
        console.log(this.email)
    }
  }
  
  addAddress() {


    this._shippingService.addAddress(this.email,this.shippingData).subscribe({
      next: (res) => {
        this.shippingData=res;
      },
      error: (err) => {
        console.log(err);
      },
    })
     
  }


  createOrder()
{
  this._order.creatOrder(this.order).subscribe({
    next: (res) => {
      // this.order = res
    },
    error: (err) => {
    },
})
}

goToShipping(checkshipping: boolean): void {
  this.IsShipping = checkshipping;
  setTimeout(() => {
    if (this.shippingStep && this.paymentStep) {
      this.shippingStep.nativeElement.classList.add('active');
      this.paymentStep.nativeElement.classList.remove('active');
    }
  });
}

goToPayment(checkshipping: boolean): void {
  this.IsShipping = checkshipping;
  setTimeout(() => {
    if (this.shippingStep && this.paymentStep) {
      this.paymentStep.nativeElement.classList.add('active');
      this.shippingStep.nativeElement.classList.remove('active');
    }
  });
}
}