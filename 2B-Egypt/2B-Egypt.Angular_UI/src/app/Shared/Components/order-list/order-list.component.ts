import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, RouterLink, TranslateModule],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: any[] = [];
  currentLang: string = 'en';  

  constructor(private orderService: OrderService, private translate: TranslateService) {}

  ngOnInit(): void {
    this.translate.setDefaultLang('en');
    this.currentLang = this.translate.currentLang || 'en';

    this.translate.onLangChange.subscribe(lang => {
      this.currentLang = lang.lang;
    });

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

getStatusText(statusCode: number): Observable<string> {
  const statusMap: { [key: string]: string } = {
    '1': 'STATUS.PENDING',
    '2': 'STATUS.CONFIRMED',
    '3': 'STATUS.SHIPPED',
    '4': 'STATUS.ATTEMPTED_DELIVERY',
    '5': 'STATUS.RECEIVED',
    '6': 'STATUS.CANCELED',
  };

  return this.translate.get(statusMap[statusCode.toString()] || 'UNKNOWN_STATUS');
}

}
