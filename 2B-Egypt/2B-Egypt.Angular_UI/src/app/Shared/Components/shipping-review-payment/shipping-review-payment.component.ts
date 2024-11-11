import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShippingService } from '../../../services/shipping.service';
import { IShippingData } from '../../../../models/ishipping-data';
import { Router, RouterModule } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { IOrder } from '../../../../models/iorder';
import { CartService } from '../../../ShoppingCart/Services/CartService';
import { CartItem } from '../../../ShoppingCart/Models/CartItem';
import { TranslateModule } from '@ngx-translate/core';
import { state } from '@angular/animations';
@Component({
  selector: 'app-shipping-review-payment',
  standalone: true,
  imports: [CommonModule, FormsModule , RouterModule,TranslateModule],
  templateUrl: './shipping-review-payment.component.html',
  styleUrls: ['./shipping-review-payment.component.css'],
})
export class ShippingReviewPaymentComponent implements OnInit,OnChanges {
  IsShipping : boolean = true;
  selectedPaymentMethod: string = '';
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

  constructor(private _shippingService: ShippingService ,private _order:OrderService , private _cartService:CartService ,private router:Router) {}
  ngOnChanges(): void {

  }
  ngOnInit() {
    this.IsShipping=true;
    this.order.transactionId = "1";
    this.order.paymentType = this.selectedPaymentMethod;
    const userString = sessionStorage.getItem("user");
    let array  = this._cartService.getCartItems()
    console.log(array);

    let Items = array.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      itemTotalPrice: item.price
    }));

    console.log(Items)
    this.order.orderItems = Items
    let subTotal = 0
    for(let total of array)
      {
        subTotal+=(total.price)*(total.quantity)
      }
      this.order.totalAmount = subTotal;
      console.log(subTotal)
      console.log(array)
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


      createOrder() {
        console.log(this.order)
        this.order.paymentType = this.selectedPaymentMethod;
        if (this.order.paymentType == "Paypal Card")
           {

            this.router.navigate(['/paypal'], { state: { orderDetails: this.order } });
          }
        else {
          this._order.creatOrder(this.order).subscribe({
            next: (res) => {
              localStorage.clear();
              this.router.navigateByUrl('order-list').then(() => {
                window.location.reload();
              });
            },
            error: (err) => {
            }
          });
        }
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





// /*import { Component } from '@angular/core';
// import { ICreateOrderRequest, IPayPalConfig, NgxPayPalModule } from 'ngx-paypal';

// @Component({
//   selector: 'app-paypal2',
//   standalone: true,
//   imports: [NgxPayPalModule],
//   templateUrl: './paypal2.component.html',
//   styleUrl: './paypal2.component.css'
// })
// export class Paypal2Component {

//   public payPalConfig?: IPayPalConfig;
//   ngOnInit(): void {
//     this.initConfig();
//   }

//   private initConfig(): void {


//     this.payPalConfig = {
//     currency: 'EUR',
//     clientId: 'Ab9lglzdiPC5mJxHHMPic0jFslZGTrvFsPNg9-4RP9IU3oI_RXIHGWE7DHCGTlVMUt-DCDghXm6F9ELf',
//     createOrderOnClient: (data) => <ICreateOrderRequest>{
//       intent: 'CAPTURE',
//       purchase_units: [
//         {
//           amount: {
//             currency_code: 'EUR',
//             value: '9.99',
//             breakdown: {
//               item_total: {
//                 currency_code: 'EUR',
//                 value: '9.99'
//               }
//             }
//           },
//           items: [
//             {
//               name: 'Enterprise Subscription',
//               quantity: '1',
//               category: 'DIGITAL_GOODS',
//               unit_amount: {
//                 currency_code: 'EUR',
//                 value: '9.99',
//               },
//             }
//           ]
//         }
//       ]
//     },
//     advanced: {
//       commit: 'true'
//     },
//     style: {
//       label: 'paypal',
//       layout: 'vertical'
//     },
//     onApprove: (data, actions) => {
//       console.log('onApprove - transaction was approved, but not authorized', data, actions);
//       actions.order.get().then((details: any) => {
//         console.log('onApprove - you can get full order details inside onApprove: ', details);
//       });
//     },
//     onClientAuthorization: (data) => {
//       console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
//     },
//     onCancel: (data, actions) => {
//       console.log('OnCancel', data, actions);
//     },
//     onError: err => {
//       console.log('OnError', err);
//     },
//     onClick: (data, actions) => {
//       console.log('onClick', data, actions);
//     },
//   };
//   }
// }
// */

// import { Component } from '@angular/core';
// import { ICreateOrderRequest, IPayPalConfig, NgxPayPalModule } from 'ngx-paypal';

// @Component({
//   selector: 'app-paypal2',
//   standalone: true,
//   imports: [NgxPayPalModule],
//   templateUrl: './paypal2.component.html',
//   styleUrls: ['./paypal2.component.css'] // Corrected to styleUrls
// })
// export class Paypal2Component {

//   public payPalConfig?: IPayPalConfig;

//   ngOnInit(): void {
//     this.initConfig();
//   }

//   private initConfig(): void {
//     this.payPalConfig = {
//       currency: 'EUR',
//       clientId: 'Ab9lglzdiPC5mJxHHMPic0jFslZGTrvFsPNg9-4RP9IU3oI_RXIHGWE7DHCGTlVMUt-DCDghXm6F9ELf', // Replace with your actual sandbox client ID
//       createOrderOnClient: (data) => <ICreateOrderRequest>{
//         intent: 'CAPTURE', // Use CAPTURE if you want to capture immediately
//         purchase_units: [
//           {
//             amount: {
//               currency_code: 'EUR',
//               value: '9.99',
//               breakdown: {
//                 item_total: {
//                   currency_code: 'EUR',
//                   value: '9.99'
//                 }
//               }
//             },
//             items: [
//               {
//                 name: 'Enterprise Subscription',
//                 quantity: '1',
//                 category: 'DIGITAL_GOODS',
//                 unit_amount: {
//                   currency_code: 'EUR',
//                   value: '9.99',
//                 },
//               }
//             ]
//           }
//         ]
//       },
//       advanced: {
//         commit: 'true'
//       },
//       style: {
//         label: 'paypal',
//         layout: 'vertical'
//       },
//       onApprove: (data, actions) => {
//         console.log('onApprove - transaction was  approved, but not authorized', data, actions);
//         // Capture the funds from the transaction

//         return actions.order.capture().then((details: any) => {
//           console.log('Transaction completed by ' + details.payer.name.given_name);
//           console.log('Transaction Id' + details.Id);
//           console.log('onApprove - you can get full order details inside onApprove: ', details);
//           if (details.status === 'COMPLETED') {
//             console.log('Transaction was successfully captured.');
//           } else {
//             console.log('Transaction was not captured successfully.');
//           }
//         });
//       },
//       onClientAuthorization: (data) => {
//         console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
//       },
//       onCancel: (data, actions) => {
//         console.log('OnCancel', data, actions);
//       },
//       onError: err => {
//         console.log('OnError', err);
//       },
//       onClick: (data, actions) => {
//         console.log('onClick', data, actions);
//       },
//     };
//   }
// }
    }
