import { Component } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule,MatTableModule ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})


export class OrderListComponent {
  orders: any[] = [];
  getStatusText(statusCode: number): string {
    switch (statusCode) {
      case 1:
        return 'Pending';          
      case 2:
        return 'Confirmed';       
      case 3:
        return 'Shipped';          
      case 4:
        return 'Attempted delivery'; 
      case 5:
        return 'Received';        
      case 6:
        return 'Canceled';        
      default:
        return 'Unknown';          
    }
  }
  
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    const userSessionData = sessionStorage.getItem('user');

    if (userSessionData) {
      const userData = JSON.parse(userSessionData);
      const userId = userData.id;

      this.orderService.getAllOrders(userId).subscribe(
        (response) => {
          this.orders = response;
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
