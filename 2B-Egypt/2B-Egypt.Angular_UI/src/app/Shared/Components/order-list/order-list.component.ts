import { Component } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule,MatTableModule,RouterLink,TranslateModule ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})


export class OrderListComponent {
  orders: any[] = [];
  
  // getStatusText(statusCode: number): string {
  //   switch (statusCode) {
  //     case 1:
  //       return this.translate.instant('STATUS.PENDING');          
  //     case 2:
  //       return this.translate.instant('STATUS.CONFIRMED');       
  //     case 3:
  //       return this.translate.instant('STATUS.SHIPPED');          
  //     case 4:
  //       return this.translate.instant('STATUS.ATTEMPTED_DELIVERY'); 
  //     case 5:
  //       return this.translate.instant('STATUS.RECEIVED');        
  //     case 6:
  //       return this.translate.instant('STATUS.CANCELED');        
  //     default:
  //       return this.translate.instant('UNKNOWN_STATUS');          
  //   }
  // }
  getStatusText(statusCode: number): Observable<string> {
    let statusKey: string;
  
    switch (statusCode) {
      case 1:
        statusKey = 'STATUS.PENDING';
        break;
      case 2:
        statusKey = 'STATUS.CONFIRMED';
        break;
      case 3:
        statusKey = 'STATUS.SHIPPED';
        break;
      case 4:
        statusKey = 'STATUS.ATTEMPTED_DELIVERY';
        break;
      case 5:
        statusKey = 'STATUS.RECEIVED';
        break;
      case 6:
        statusKey = 'STATUS.CANCELED';
        break;
      default:
        statusKey = 'UNKNOWN_STATUS';
    }
  
    return this.translate.get(statusKey);
  }
  
  
  constructor(private orderService: OrderService,private translate: TranslateService) {}

  // ngOnInit(): void {
  //   this.translate.setDefaultLang('en');
  //   const userSessionData = sessionStorage.getItem('user');

  //   if (userSessionData) {
  //     const userData = JSON.parse(userSessionData);
  //     const userId = userData.id;

  //     this.orderService.getAllOrders(userId).subscribe(
  //       (response) => {
  //         this.orders = response;
  //         console.log('Orders:', this.orders); 
  //       },
  //       (error) => {
  //         console.error('Error fetching orders:', error);
  //       }
  //     );
  //   } else {
  //     console.error('User data not found in session storage');
  //   }
  // }
  ngOnInit(): void {
    this.translate.setDefaultLang('en');
    const userSessionData = sessionStorage.getItem('user');
  
    if (userSessionData) {
      const userData = JSON.parse(userSessionData);
      const userId = userData.id;
  
      this.orderService.getAllOrders(userId).subscribe(
        (response) => {
          this.orders = response.sort((a: any, b: any) => b.orderNumber - a.orderNumber);

          console.log('Orders:', this.orders); 
        },
        (error) => {
          console.error('Error fetching orders:', error);
        }
      );
    } else {
      console.error('User data not found in session storage');
    }
  }
  
  
  viewOrderDetails(order: any) {
    console.log('Order details:', order);
  }


}
