import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICreateOrderRequest, IPayPalConfig, NgxPayPalModule } from 'ngx-paypal';
import { OrderService } from '../../../services/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pay-pal',
  standalone: true,
  imports: [NgxPayPalModule,CommonModule],
  templateUrl: './pay-pal.component.html',
  styleUrls: ['./pay-pal.component.css']
})
export class PaypalComponent implements OnInit {
  order: any = {};  
  public payPalConfig?: IPayPalConfig;  

  constructor(private router: Router , private _orderservice:OrderService) {}

  ngOnInit() {
    this.order = history.state.orderDetails;  
    console.log('Order details:', this.order);

    if (this.order && this.order.orderItems && this.order.totalAmount) {
      this.initConfig();
    } else {
      console.error('Order details are missing or incomplete.');
    }
  }

  private initConfig(): void {
    if (this.order && this.order.orderItems && this.order.totalAmount) {
      this.payPalConfig = {
        currency: 'USD',
        clientId: 'ARFZBh8mKSD93LW_PDqOEljXHa5YyIdnWkm_p4Z8ijcJiVjpPAll-tjZc15yse8E2D4lTTbflbcHrwOP',
        createOrderOnClient: (data) => <ICreateOrderRequest> {
          intent: 'CAPTURE',
          purchase_units: [{
            amount: {
              currency_code: 'USD',
              value: (this.order.totalAmount / 1).toFixed(2),  
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: (this.order.totalAmount / 1).toFixed(2)  
                }
              }
            },
            items: this.order.orderItems.map((item: any) => ({
              name: item.name || "Unnamed Product",  
              quantity: item.quantity.toString(),  
              unit_amount: {
                currency_code: 'USD',
                value: (item.price && !isNaN(item.price) ? (item.price / 1).toFixed(2) : "0.00")  
              }
            }))
          }]
        },
        advanced: {
          commit: 'true'
        },
        style: {
          label: 'paypal',
          layout: 'vertical'
        },
        onApprove: (data, actions) => {
          console.log('Transaction approved:', data);
          return actions.order.get().then((details: any) => {
            const TransactionId = details.id;
            console.log(details.id)
            console.log('Transaction ID:', TransactionId);
            this.order.transactionId = TransactionId
            this._orderservice.creatOrder(this.order).subscribe({
              next: (res) => {
                localStorage.clear();
                this.router.navigateByUrl('order-list').then(() => {
                  window.location.reload();
                });
              },
              error: (err) => {
              }
            });
            console.log(this.order)
      
          });
        },
        onClientAuthorization: (data) => {
          console.log('Transaction authorized:', data);
        },
        onCancel: (data, actions) => {
          console.log('Transaction canceled:', data, actions);
        },
        onError: err => {
          console.log('Error:', err);
        },
        onClick: (data, actions) => {
          console.log('PayPal button clicked:', data, actions);
        }
      };
    } else {
      console.error("Order details are missing or incomplete.");
    }
  }

}