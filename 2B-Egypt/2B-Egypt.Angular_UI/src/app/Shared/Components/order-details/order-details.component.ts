import { Component } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {
  orderId!: string;
  orderDetails: any;
  errorMessage: string | null = null;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('orderId');
    if (orderId) {
      this.orderService.getOrderDetails(orderId).subscribe({
        next: (data) => {
          this.orderDetails = data;
        },
        error: (error) => {
          console.error('Error fetching order details:', error);
        }
      });
    }
  }
}

