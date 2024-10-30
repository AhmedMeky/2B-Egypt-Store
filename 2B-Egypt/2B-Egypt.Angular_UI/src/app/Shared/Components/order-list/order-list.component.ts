import { Component } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})


export class OrderListComponent {
  orders: any[] = [];
  constructor(private orderService: OrderService){}
  ngOnInit(): void {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.orderService.getAllOrders(userId).subscribe(
        (response) => {
          this.orders = response;
        },
        (error) => {
          console.error('Error fetching orders', error);
        }
      );
    }
  }
  viewOrderDetails(order: any) {
    console.log('Order details:', order);
  }


}
