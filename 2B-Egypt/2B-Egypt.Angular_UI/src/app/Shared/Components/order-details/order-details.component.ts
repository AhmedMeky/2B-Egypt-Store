import { Component } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule,RouterLink,TranslateModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {
  orderId!: string;
  orderDetails: any;
  errorMessage: string | null = null;
  

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('orderId');
    if (orderId) {
      this.orderService.getOrderDetails(orderId).subscribe({
        next: (data) => {
          this.orderDetails = data;
          console.log(this.orderDetails = data);
        },
        error: (error) => {
          console.error('Error fetching order details:', error);
        }
      });
    }
  }
  // getStatusText(statusCode: number): string {
  //   switch (statusCode) {
  //     case 1: return 'Pending';          
  //     case 2: return 'Confirmed';       
  //     case 3: return 'Shipped';          
  //     case 4: return 'Attempted delivery'; 
  //     case 5: return 'Received';        
  //     case 6: return 'Canceled';        
  //     default: return 'Unknown';          
  //   }
  // }
  getStatusText(statusCode: number): string {
    switch (statusCode) {
      case 1: return this.translate.instant('STATUS.PENDING');          
      case 2: return this.translate.instant('STATUS.CONFIRMED');       
      case 3: return this.translate.instant('STATUS.SHIPPED');          
      case 4: return this.translate.instant('STATUS.ATTEMPTED_DELIVERY'); 
      case 5: return this.translate.instant('STATUS.RECEIVED');        
      case 6: return this.translate.instant('STATUS.CANCELED');        
      default: return this.translate.instant('ORDER_DETAILS.UNKNOWN');          
    }
  }
  getLocalizedProductName(item: any): string {
    return this.translate.currentLang === 'ar' ? item.nameAr : item.nameEn;
  }
}

